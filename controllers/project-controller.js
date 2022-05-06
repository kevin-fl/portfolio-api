const db = require("../models");
const { NotFoundErrorResponse, ErrorResponse } = require("../response-schemas/error-schema");
const { SuccessObjectResponse } = require("../response-schemas/succes-schema");

const projectController = {

    getById: async (req, res) => {

        const id = parseInt(req.params.id);


        const projectId = await db.Project.findByPk(id, {
            include: [
                {
                    model: db.Commentaire,
                    attributes: ['id', 'content', 'projectId', 'userId'],
                    include: {
                        model: db.User,
                        attributes: ['id', 'pseudo']
                    }
                },
            ]
        });

        if (!projectId) {
            return res.status(404).json(new NotFoundErrorResponse('project not found'));

        }

        return res.json(projectId);

    },

    getAll: async (req, res) => {

        const projects = await db.Project.findAndCountAll();

        return res.json(projects);


    },

    add: async (req, res) => {

        const data = req.validatedData;

        const newProject = await db.Project.create(data);
        res.json(newProject);




    },

    update: async (req, res) => {
        const id = req.params.id;
        const data = req.validatedData;
        const result = await db.Project.update(data, {
            where: { id }

        });
        if (result[0] !== 1) {
            return res.status(400).json(new ErrorResponse('project not updated and not found'));
        }
        res.json(new SuccessObjectResponse('Project updated !'));
    },


    delete: async (req, res) => {
        const id = parseInt(req.params.id);
        const goal = await db.Project.findByPk(id);

        if (!goal) {
            return res.status(400).json(new NotFoundErrorResponse('Project not found'));

        }

        await goal.destroy();

        res.sendStatus(204);
    }




};

module.exports = projectController;



