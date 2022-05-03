const noteController = require('../controllers/note-controller');
const { authentificateJwt } = require('../middlewares/authentificate-jwt');
const bodyValidation = require('../middlewares/body-validation-middleware');
const { noteValidator } = require('../validators/note-validator');


const noteRouter = require('express').Router();

noteRouter.route('/')
    .get(noteController.getAll)
    .post(authentificateJwt(), bodyValidation(noteValidator), noteController.add);


noteRouter.route('/:id([0-9]+)')
    .get(noteController.getById)
    .put(authentificateJwt(), bodyValidation(noteValidator), noteController.update)
    .delete(authentificateJwt(), noteController.delete);


module.exports = noteRouter; 