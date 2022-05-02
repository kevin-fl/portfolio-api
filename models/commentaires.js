const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const Commentaires = sequelize.define('commentaires', {

        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true

        },
        project_Id: {
            type: DataTypes.BIGINT,
            allowNull: false

        },
        member_Id: {
            type: DataTypes.BIGINT,
            allowNull: false


        },
        commentaires_Id: {
            type: DataTypes.BIGINT,
            allowNull: false


        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        }

    });

    return Commentaires;
};




// y a t'il besoin d avoir Member_Id , Project_Id et Commentaires_Id ?