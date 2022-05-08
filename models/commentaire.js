const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {

//     utilisation de sequelize (orm) permet la connexion a une base de donnée (sql )
    const Commentaire = sequelize.define('commentaire', {

//         on defini les champs de la db , commentaire prendra un id de type number et un content de type string 
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true

        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        }

    });

    return Commentaire;
};




/
