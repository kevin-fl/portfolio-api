const newsController = require('../controllers/news-controller');
const { authentificateJwt } = require('../middlewares/authentificate-jwt');
const bodyValidation = require('../middlewares/body-validation-middleware');
const { messageValidator } = require('../validators/message-validator');


const notesRouter = require('express').Router();


notesRouter.route('/:id([0-9]+)')
    .get(newsController.getById)
    .put(authentificateJwt(), bodyValidation(messageValidator), newsController.update);

module.exports = notesRouter; 