const db = require("../models");
const { NotFoundErrorResponse, ErrorResponse } = require("../response-schemas/error-schema");
const { SuccessObjectResponse } = require("../response-schemas/succes-schema");

const notesController = {

    getById: async (req, res) => {
        const id = parseInt(req.params.id);

        const notes = await db.Notes.findByPk(id, {
            include: {
                model: db.Member,  // ? ou db.Notes 
                attributes: ['id', 'newsId']  // ou notes ? 
            },
            attributes: {
                exclude: ['']
            }
        });
        if (!notes) {
            return res.status(404).json(new NotFoundErrorResponse('Notes not found '));
        }

        res.json(new SuccessObjectResponse(notes));
    },

    update: async (req, res) => {
        const idNotes = parseInt(req.params.id);
        const dataNotes = req.validatedData;
        const memberIdNotes = req.user.id;


        const [nbRow, updatedData] = await db.Notes.update(dataNotes, {
            where: {
                [Op.and]: [
                    { idNotes },  // ou bien juste id ? 
                    { memberIdNotes }
                ]
            },
            returning: true
        });

        if (nbRow !== 1) {
            return res.status(400).json(new ErrorResponse('Error during notes update'));
        }
        res.json(new SuccessObjectResponse(updatedData));
    },

};

module.exports = notesController;




// rajouter un delete au notes ? 