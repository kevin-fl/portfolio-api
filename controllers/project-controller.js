const { Project } = require("../models");
const db = require("../models");
const project = require("../models/project");

const projectController = {

    getAll: async (req, res) => {

        const projects = await db.Project.findAndCountAll();

        return res.json(projects);

    },

    add: async (req, res) => {

        const data = req.validatedData;

        const newProject = await db.Project.create(data);
        res.json(newProject);



    }


};

module.exports = projectController;



/* RAJOUTER UN ADD POUR RAJOUTER DES PROJETS ??? 
add: async (req, res) => {
    // Récuperation des donnée à ajouter en DB
    const data = req.validatedData;
    // Récuperation des données liée au login
    data.memberId = req.user.id;
    // Ajout d'une transaction
    // -> Sécurité pour s'assuré que toutes les opérations DB soit réalisé ou aucunne
    const transaction = await db.sequelize.transaction();
    try {
        // Ajout d'un nouveau sujet
        const newSubject = await db.Subject.create(data, { transaction });
        // Ajout des categories via l'id (si elle est présente en DB)
        await newSubject.addCategory(data.categories, { transaction });
        // Validation des modifications dans la DB
        await transaction.commit();
        // Envoi du sujet créé
        res.json(new SuccessObjectResponse(newSubject));
    }
    catch (error) {
        // Retour à l'etat (avant les modifications)
        await transaction.rollback();
        // Propagation de l'erreur
        throw error;
    }
},
*/