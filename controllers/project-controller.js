const { Project } = require("../models");
const db = require("../models");
const project = require("../models/project");

const projectController = {

    getAll: async (req, res) => {

        const projects = await db.Project.findAndCountAll();

        return res.json(projects);

    },

    add: async (req, res) => {

        const data = req.validatedData;

        const newProject = await db.Project.create(data);
        res.json(newProject);



    }


};

module.exports = projectController;