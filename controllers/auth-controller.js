const db = require('../models');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { ErrorResponse } = require('../response-schemas/error-schema');
const { generateJWT } = require('../utils/jwt-utils');

const authController = {

    register: async (req, res) => {
        // Recuperation des données
        const { pseudo, email } = req.validatedData;
        // Hashage du mot de passe à l'aide de "bcrypt"
        const password = await bcrypt.hash(req.validatedData.password, 10);

        console.log(req.validatedData);
        // return res.json(req.validatedData);

        // Création du compte en base de données
        // const user = await db.User.create({
        //     password: 'password',
        //     pseudo: 'hello',
        //     email: 'hello@gmail.com'
        // });

        const user = await db.User.create({ pseudo, email, password });

        // Génération d'un « Json Web Token »
        const token = await generateJWT({
            id: user.id,
            pseudo: user.pseudo,
            isAdmin: user.isAdmin
        });

        // // Envoi du token
        res.json(token);
    },

    login: async (req, res) => {
        // Recuperation des données
        const { identifier, password } = req.validatedData;

        // Récuperation du compte "member" à l'aide du pseudo ou de l'email
        const user = await db.User.findOne({
            where: {    // Condition avec un OU en SQL
                [Op.or]: [
                    {   // Test du pseudo avec une egalité stricte (implicite)
                        pseudo: identifier
                    },
                    {   // Test de l'email avec l'operateur EQUALS
                        email: { [Op.eq]: identifier.toLowerCase() }
                    }
                ]
            }
        });


        // Erreur 422, si le member n'existe pas (pseudo ou email invalide)
        if (!user) {
            return res.status(422).json(new ErrorResponse('Bad credential', 422));
        }

        // Si le member existe: Vérification du password via "bcrypt"
        const isValid = await bcrypt.compare(password, user.password);

        // Erreur 422, si le mot de passe ne correspond pas au hashage
        if (!isValid) {
            return res.status(422).json(new ErrorResponse('Bad credential', 422));
        }

        // Génération d'un « Json Web Token »
        const token = await generateJWT({
            id: user.id,
            pseudo: user.pseudo,
            isAdmin: user.isAdmin
        });

        // Envoi du token
        res.json(token);
    }
};

module.exports = authController;


























// 1)check pour les mots member car certainement user a utiliser dans mon cas !! ou bien changer le contenu de member.js par user.js

// 2)message-messageController --> ligne 35-42
// le [Op.and] ? viens de la Db , dans mon cas quel action effectuer

// 3)// est ce que update add getById est necessaire ?
//  ln 51[op.and] lié a la Db , qu elle action entreprendre des lors ??

// 4) notes-controller --> ln 35

// 5)commentaires.js
//  y a t'il besoin d avoir Member_Id , Project_Id et Commentaires_Id ?

// 6)index.js --> ln 36-37
// me reste a faire les associations one to one et many to many de- project
// // de -commentaires -notes -news et -member

// 7)notes.js --> ln 18
//  comment faire pour accepter jsute emoji ou operateur '+' '-'

// 8)middlewares authentificate jwt -->
// ln 3 const op





// association [one to many] commentaires - project
// un commentaire peut etre mis sur plusieurs projets .
// un projet peut recevoir un commentaire de chaque member


// association [many to many ] project - commentaires
// un projet peut avoir plusieurs commentaires du meme member , plusieurs projets
// peuvent etre commenter par un member .

// association [many to many]



// association []
