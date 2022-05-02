const { Sequelize, DataTypes } = require('sequelize');
const message = require('./message');

/**
 * @param {Sequelize} sequelize
 *@returns
 */

module.exports = (sequelize) => {
    const Notes = sequelize.define('notes', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true

        },
        content: {
            type: DataTypes.STRING(10),  // comment faire pour accepter jsute emoji ou operateur '+' '-'
            allowNull: true
        }
    }, {
        tableName: 'notesMessage'
    });

    return Notes;

};