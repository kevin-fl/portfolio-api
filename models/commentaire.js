const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const Commentaire = sequelize.define('commentaire', {

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




// y a t'il besoin d avoir Member_Id , Project_Id et Commentaires_Id ?