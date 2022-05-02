const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const News = sequelize.define('news', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Image: {
            type: DataTypes.STRING ?
                allowNull : false

        },
        text: {
            type: DataTypes.STRING,
            allowNull: true
        },

    });

    return News;

};