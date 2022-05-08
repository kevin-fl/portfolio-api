const commentaireController = require('../controllers/commentaire-controller');
const { authentificateJwt } = require('../middlewares/authentificate-jwt');    // pour authentifier le token utiliser avec le password du user 
const bodyValidation = require('../middlewares/body-validation-middleware');
const commentaire = require('../models/commentaire');
const { commentaireValidator } = require('../validators/commentaire-validator');


const commentaireRouter = require('express').Router();

//creation des routes pour les methodes get (recup l infos) , post envoi une nouvelle info (add) 
commentaireRouter.route('/')
    .get(commentaireController.getAll)     // autorise le controller a utiliser les differentes methodes .get , .post etc 
    .post(authentificateJwt({ adminRight: true }), bodyValidation(commentaireValidator), commentaireController.add);

commentaireRouter.route('/:id([0-9]+)')
    .get(commentaireController.getById)
    .delete(authentificateJwt(), commentaireController.delete);

module.exports = commentaireRouter;


    
