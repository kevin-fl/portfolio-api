const { Sequelize, DataTypes } = require('sequelize');

/**
 * @param {Sequelize} sequelize
 *@returns
 */

module.exports = (sequelize) => {
    const Note = sequelize.define('note', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true

        },
        content: {
            type: DataTypes.STRING(10),  // comment faire pour accepter jsute emoji ou operateur '+' '-'
            allowNull: true
        }
    });

    return Note;

};