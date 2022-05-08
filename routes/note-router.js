const noteController = require('../controllers/note-controller');
const { authentificateJwt } = require('../middlewares/authentificate-jwt');
const bodyValidation = require('../middlewares/body-validation-middleware');  // permet de valider via un middleware (permet l interaction entre diff dossiers) les formulaires via yup . 
const { noteValidator } = require('../validators/note-validator');

// on utilise express qui permet de crée des API prend en back les details des sessions , traitement des erreurs et le routage 
const noteRouter = require('express').Router();  

noteRouter.route('/')
    .get(noteController.getAll)
    .post(authentificateJwt(), bodyValidation(noteValidator), noteController.add);


noteRouter.route('/:id([0-9]+)')
    .get(noteController.getById)
    .put(authentificateJwt(), bodyValidation(noteValidator), noteController.update)
    .delete(authentificateJwt(), noteController.delete);

module.exports = noteRouter; 
