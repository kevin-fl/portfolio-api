const db = require("../models");
const { NotFoundErrorResponse, ErrorResponse } = require("../response-schemas/error-schema");
const { SuccessObjectResponse } = require("../response-schemas/succes-schema");

const commentairesController = {

    getById: async (req, res) => {
        const id = parseInt(req.params.id);

        const commentaires = await db.Commentaires.findByPK(id, {
            include: {
                model: db.Member,
                attributes: ['commentairesId', 'memberId', 'projectId']

            },
            attributes: {
                include: ['memberId']

            }

        });
        if (!commentaires) {
            return res.status(404).json(new NotFoundErrorResponse('commentaires not found '));

        }
        res.json(new SuccessObjectResponse(commentaires));

    },

    update: async (req, res) => {
        const id = parseInt(req.params.id);
        const data = req.validatedData;
        const commentairesId = req.user.id;

        const [nbRow, updatedData] = await db.Commentaires.update(data, {
            where: {
                [Op.and]: [              // ? via DB ? pas compris  
                    { id },
                    { commentairesId }


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
        const { id: memberId, isAdmin } = req.user;

        const goal = await db.Commentaires.findByPK(id);

        if (!goal) {
            return res.status(400).json(new NotFoundErrorResponse('commentaires not found'));


        }
        if (!(goal.memberId === memberId || isAdmin)) {
            return res.sendStatus(403);

        }

        await goal.destroy();

        res.sendStatus(204);

    }
};

module.exports = commentairesController;