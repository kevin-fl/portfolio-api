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
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    });

    return Note;

};