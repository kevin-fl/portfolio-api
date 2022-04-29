const projectController = require('../controllers/project-controller');
const { authentificateJwt } = require('../middlewares/authentificate-jwt');
const bodyValidation = require('../middlewares/body-validation-middleware');
const { projectValidator } = require('../validators/project-validator');

const projectRouter = require('express').Router();

projectRouter.route('/')
    .get(projectController.getAll)
    .post(authentificateJwt({ adminRight: true }), bodyValidation(projectValidator), projectController.add);



module.exports = projectRouter;
