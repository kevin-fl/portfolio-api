const db = require("../models");
const { NotFoundErrorResponse, ErrorResponse } = require("../response-schemas/error-schema");
const { SuccessObjectResponse } = require("../response-schemas/succes-schema");

const noteController = {

    getById: async (req, res) => {
        const id = parseInt(req.params.id);

        const note = await db.Note.findByPk(id);

        res.json(new SuccessObjectResponse(note));
    },


    getAll: async (req, res) => {
        const getNote = await db.Note.findAndCountAll();
        return res.json(getNote);


    },

    update: async (req, res) => {
        const idNote = parseInt(req.params.id);
        const dataNote = req.validatedData;
        const memberIdNote = req.user.id;


        const [nbRow, updatedData] = await db.Note.update(dataNote, {
            where: {
                [Op.and]: [
                    { idNote },  // ou bien juste id ? 
                    { memberIdNote }
                ]
            },
            returning: true
        });

        if (nbRow !== 1) {
            return res.status(400).json(new ErrorResponse('Error during notes update'));
        }
        res.json(new SuccessObjectResponse(updatedData));
    },


    add: async (req, res) => {
        const data = req.validatedData;
        const newNote = await db.Note.create(data);
        res.json(newNote);
    },

    delete: async (req, res) => {
        const id = parseInt(req.params.id);


        const goal = await db.Note.findByPk(id);

        if (!goal) {
            return res.status(400).json(new NotFoundErrorResponse('note not found'));

        }

        await goal.destroy();
        return res.sendStatus(204);
    }

};

module.exports = noteController;




// rajouter un delete au notes ? 