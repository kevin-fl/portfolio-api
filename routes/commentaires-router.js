const commentairesController = require('../controllers/commentaires-controller');
const { authentificateJwt } = require('../middlewares/authentificate-jwt');
const bodyValidation = require('../middlewares/body-validation-middleware');
const { commentairesValidator } = require('../validators/commentaires-validator');


const commentairesRouter = require('express').Router();

commentairesRouter.route('/:id([0-9]+)')
    .get(commentairesController.getById)
    .post(authentificateJwt({ adminRight: true }), bodyValidation(commentairesValidator), commentairesController.update)
    .delete(authentificateJwt(), commentairesController.delete);

module.exports = commentairesRouter;



    // ln 11 .update voir si correcte 