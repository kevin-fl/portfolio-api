const { parse } = require("dotenv-flow");
const db = require("../models");
const { NotFoundErrorResponse, ErrorResponse } = require("../response-schemas/error-schema");
const { SuccessObjectResponse } = require("../response-schemas/succes-schema");


const newsController = {

    getById: async (req, res) => {

        const id = parseInt(req.params.id);

        const news = await db.News.findByPk(id);
        if (!news) {
            return res.status(404).json(new NotFoundErrorResponse('Emoji reaction to news not found'));
        }
        return res.json(new SuccessObjectResponse(news));

    },

    getAll: async (req, res) => {

        const news = await db.News.findAndCountAll();

        return res.json(news);


    },

    add: async (req, res) => {

        const data = req.validatedData;

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
    },

    delete: async (req, res) => {
        const id = parseInt(req.params.id);
        const goal = await db.News.findByPk(id);

        if (!goal) {
            return res.status(400).json(new NotFoundErrorResponse('news not found'));
        }

        await goal.destroy();
        res.sendStatus(204);
    },


};

module.exports = newsController;



// est ce que update add getById est necessaire ?
// ln 51[op.and] lié a la Db , qu elle action entreprendre des lors ?? 