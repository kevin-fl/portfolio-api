const newsController = require('../controllers/news-controller');
const { authentificateJwt } = require('../middlewares/authentificate-jwt');
const bodyValidation = require('../middlewares/body-validation-middleware');
const { notesValidator } = require('../validators/notes-validator');


const notesRouter = require('express').Router();


notesRouter.route('/:id([0-9]+)')
    .get(newsController.getById)
    .put(authentificateJwt(), bodyValidation(notesValidator), newsController.update);

module.exports = notesRouter; 