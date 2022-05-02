const db = require("../models");
const { NotFoundErrorResponse, ErrorResponse } = require("../response-schemas/error-schema");
const { SuccessObjectResponse } = require("../response-schemas/succes-schema");

const newsController = {

    getById: async (req, res) => {

        const id = parseInt(req.params.id);

        const newsEmoji = await db.News.findByPk(id, {
            include: {
                model: db.Member,
                attributes: ['id']

            },
        });
        if (!newsEmoji) {
            return res.status(404).json(new NotFoundErrorResponse('Emoji reaction to news not found'));
        }
        res.json(new SuccessObjectResponse(newsEmoji));

    },

    getAll: async (req, res) => {

        const news = await db.News.findAndCountAll();

        return res.json(news);


    },

    add: async (req, res) => {

        const data = req.validateData;

        const addEmojiToNews = await db.News.create(data);
        res.json(addEmojiToNews);

    },


    update: async (req, res) => {
        const idNews = parseInt(req.params.id);
        const dataNews = req.validatedData;
        const memberIdNews = req.user.id;

        const [nbRowNews, updatedDataNews] = await db.News.update(dataNews, {
            where: {
                [op.and]: [
                    { idNews },
                    { memberIdNews }
                ]
            },
            returning: true
        });
        if (nbRowNews !== 1) {
            return res.status(400).json(new ErrorResponse('Error during update of news reaction'));
        }
        res.json(new SuccessObjectResponse(updatedDataNews));
    }

};

module.exports = newsController;



// est ce que update add getById est necessaire ?
// ln 51[op.and] lié a la Db , qu elle action entreprendre des lors ?? 