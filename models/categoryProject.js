const { Sequelize } = require('sequelize');

/**
 * model CategoryProject appartenant a la table intermediaire 
 * de la relation Many to Many entre le model category et project 
 * @params {Sequelize} sequelize
 * @returns
 */

module.exports = (sequelize) => {

    const CategoryProject = sequelize.define('categoryProject', {}, {
        timestamps: false,
        tableName: 'categoryProject'
    });

    return CategoryProject;
};