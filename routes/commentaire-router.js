const commentaireController = require('../controllers/commentaire-controller');
const { authentificateJwt } = require('../middlewares/authentificate-jwt');
const bodyValidation = require('../middlewares/body-validation-middleware');
const commentaire = require('../models/commentaire');
const { commentaireValidator } = require('../validators/commentaire-validator');


const commentaireRouter = require('express').Router();

commentaireRouter.route('/')
    .get(commentaireController.getAll)
    .post(authentificateJwt({ adminRight: true }), bodyValidation(commentaireValidator), commentaireController.add);

commentaireRouter.route('/:id([0-9]+)')
    .get(commentaireController.getById)
    .delete(authentificateJwt(), commentaireController.delete);

module.exports = commentaireRouter;


    // ln 11 .update voir si correcte 