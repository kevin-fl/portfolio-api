const newsController = require('../controllers/news-controller');
const noteController = require('../controllers/note-controller');
const { authentificateJwt } = require('../middlewares/authentificate-jwt');
const bodyValidation = require('../middlewares/body-validation-middleware');
const { newsValidator } = require('../validators/news-validator');
const { noteValidator } = require('../validators/note-validator');


const newsRouter = require('express').Router();

newsRouter.route('/')
    .get(newsController.getAll)
    .post(authentificateJwt({ adminRight: true }), bodyValidation(newsValidator), newsController.add);



newsRouter.route('/:id([0-9]+)')
    .get(newsController.getById)
    .delete(authentificateJwt({ adminRight: true }), newsController.delete);

newsRouter.route('/:id([0-9]+)/note')
    .post(authentificateJwt(), bodyValidation(noteValidator), noteController.add);

module.exports = newsRouter;