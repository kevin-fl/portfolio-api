// const Commentaire = require("../commentaire");
const db = require("../models");
const { NotFoundErrorResponse, ErrorResponse } = require("../response-schemas/error-schema");
const commentaire = require("../models/commentaire");

const commentaireController = {

    getById: async (req, res) => {

        const id = parseInt(req.params.id);

        const commentaireId = await db.Commentaire.findByPk(id);

        return res.json(commentaireId);

        //         const id = parseInt(req.params.id);

        //         const goal = await db.Commentaire.

        //             if(!goal) {
        //                 return res.status(404).json(new NotFoundErrorResponse('commentaires not found'));
        // };
        // res.json(goal);
        // const commentaire = await db.Commentaire.findByPK(id, {
        //     include: {
        //         model: db.User,
        //         attributes: ['id', 'pseudo']

        //     },
        //     attributes: {
        //         include: ['userId']

        //     }

        // });
        // if (!commentaire) {
        //     return res.status(404).json(new NotFoundErrorResponse('commentaires not found '));

        // }
        // res.json(new SuccessObjectResponse(commentaire));

    },

    getAll: async (req, res) => {

        const commentaireGetAll = await db.Commentaire.findAndCountAll();

        return res.json(commentaireGetAll);

    },

    add: async (req, res) => {
        const data = req.validatedData;
        const user = req.user;

        // Injection du user (Jeton d'authentification de type JWT) dans les données
        data.userId = user.id;

        const addCommentaire = await db.Commentaire.create(data);
        res.json(addCommentaire);

    },


    update: async (req, res) => {
        const id = parseInt(req.params.id);
        const data = req.validatedData;
        const commentaireId = req.user.id;

        const [nbRow, updatedData] = await db.Commentaire.update(data, {
            where: {
                [Op.and]: [
                    { id },
                    { commentaireId }


                ]
            },
            returning: true
        });

        if (nbRow !== 1) {
            return res.status(400).json(new ErrorResponse('Error during the update'));


        }
        res.json(new SuccessObjectResponse(updatedData));
    },


    delete: async (req, res) => {
        const id = parseInt(req.params.id);
        const goal = await db.Commentaire.findByPk(id);

        if (!goal) {
            return res.status(404).json(new NotFoundErrorResponse('commentaire not found'));

        }

        await goal.destroy();

        res.sendStatus(204);


    }
};

module.exports = commentaireController;