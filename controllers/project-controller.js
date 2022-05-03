const { Project } = require("../models");
const db = require("../models");
const project = require("../models/project");
const { NotFoundErrorResponse } = require("../response-schemas/error-schema");

const projectController = {

    getById: async (req, res) => {

        const id = parseInt(req.params.id);


        const projectId = await db.Project.findByPk(id);

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



