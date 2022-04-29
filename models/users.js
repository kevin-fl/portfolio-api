const { DataTypes, Sequelize } = require('sequelize');

/**
 * @param {Sequelize} sequelize
 * @returns
 */

module.exports = (sequelize) => {


    const Users = sequelize.define('users', {
        pseudo: {
            pseudo: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: {
                    name: 'Users_Pseudo'

                }

            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: {
                    name: 'Users_pseudo'

                }

            },
            password: {
                type: DataTypes.CHAR(50),
                allowNull: false

            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false

            }

        },
        // //si on souhaite avoir "createAt" mais pas "updateAt"
        // timestamps: true,
        // updatedAt: false

    });

    return Users;

};