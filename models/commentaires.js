const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const Commentaires = sequelize.define('commentaires', {
        id_Member: {
            type: DataTypes.BIGINT,


        }

    });

};