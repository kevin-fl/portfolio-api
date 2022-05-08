// const Commentaire = require("../commentaire");
const db = require("../models");
const { NotFoundErrorResponse, ErrorResponse } = require("../response-schemas/error-schema");
const commentaire = require("../models/commentaire");

// on link le model commentaires dans le controller (chief) on recupere le schema error pr les futur requetes , sert a amener vers la bonne page ou a rediriger .

const commentaireController = {
// recupere un commentaire par id 
    getById: async (req, res) => {
// parseInt car id 
        const id = parseInt(req.params.id);
// recupere via la db le commentaire avec son id 
        const commentaireId = await db.Commentaire.findByPk(id);
// return un fichier json   avec les data
        return res.json(commentaireId);

        //         const id = parseInt(req.params.id);

        //         const goal = await db.Commentaire.

        //             if(!goal) {
        //                 return res.status(404).json(new NotFoundErrorResponse('commentaires not found'));
        // };
        // res.json(goal);
        // const commentaire = await db.Commentaire.findByPK(id, {
        //     include: {
        //         model: db.User,
        //         attributes: ['id', 'pseudo']

        //     },
        //     attributes: {
        //         include: ['userId']

        //     }

        // });
        // if (!commentaire) {
        //     return res.status(404).json(new NotFoundErrorResponse('commentaires not found '));

        // }
        // res.json(new SuccessObjectResponse(commentaire));

    },
    
    //get all recupere via la db tout les commentaires sous forme de fichier json  , utilisation d insomnia pour phase de test 

    getAll: async (req, res) => {

        const commentaireGetAll = await db.Commentaire.findAndCountAll();

        return res.json(commentaireGetAll);

    },

    add: async (req, res) => {
        const data = req.validatedData;
        const projectId = req.params.id;
        const user = req.user;
        // Injection du user (Jeton d'authentification de type JWT) dans les données
        data.userId = user.id;
        data.projectId = projectId;
        const addCommentaire = await db.Commentaire.create(data);
        res.json(addCommentaire);

    },


    update: async (req, res) => {
        const id = parseInt(req.params.id);
        const data = req.validatedData;
        const commentaireId = req.user.id;
// recupere l update de la db commentaires 
        const [nbRow, updatedData] = await db.Commentaire.update(data, {
            where: {
                [Op.and]: [
                    { id },
                    { commentaireId }


                ]
            },
            returning: true
        });
// si le nbRow est different de 1 , on envoi une 400 car il manque une info pour completer l update (id, commentaireId)
        if (nbRow !== 1) {
            return res.status(400).json(new ErrorResponse('Error during the update'));

// si le nbRow est == 1 l update c est bien passer , on recupere sous format json les data updated . 
        }
        res.json(new SuccessObjectResponse(updatedData));
    },

// const goal recupere par id dans la data les commentaires 
    delete: async (req, res) => {
        const id = parseInt(req.params.id);
        const goal = await db.Commentaire.findByPk(id);
// si ell en y a pas acces return une 404 avec le mondele NotFoundError Response 
        if (!goal) {
            return res.status(404).json(new NotFoundErrorResponse('commentaire not found'));

        }
//  si tt se passe correctment , faire appel a la const goal .destroy pour delete les donnees commentaires choisi  
        await goal.destroy();

        res.sendStatus(204);


    }
};

module.exports = commentaireController;

// on exporte le module.exports =commentaireController 
