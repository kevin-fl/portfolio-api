const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const Project = sequelize.define('project', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        text: {
            type: DataTypes.STRING,
            allowNull: true
        },
    });

    return Project;

};
