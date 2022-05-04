const commentaireController = require('../controllers/commentaire-controller');
const projectController = require('../controllers/project-controller');
const { authentificateJwt } = require('../middlewares/authentificate-jwt');
const bodyValidation = require('../middlewares/body-validation-middleware');
// const commentaire = require('../models/commentaire');
const { commentaireValidator } = require('../validators/commentaire-validator');
const { projectValidator } = require('../validators/project-validator');
// const commentaireRouter = require('./commentaire-router');

const projectRouter = require('express').Router();

projectRouter.route('/')
    .get(projectController.getAll)
    .post(authentificateJwt({ adminRight: true }), bodyValidation(projectValidator), projectController.add);

projectRouter.route('/:id([0-9]+)')
    .get(projectController.getById)
    .delete(authentificateJwt({ adminRight: true }), projectController.delete)
    .put(authentificateJwt({ adminRight: true }), bodyValidation(projectValidator), projectController.update);


projectRouter.route('/:id([0-9]+)/commentaire')
    .post(authentificateJwt(), bodyValidation(commentaireValidator), commentaireController.add);

module.exports = projectRouter;
