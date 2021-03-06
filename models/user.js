const { DataTypes, Sequelize } = require('sequelize');

/**
 * @param {Sequelize} sequelize
 * @returns
 */

module.exports = (sequelize) => {


    const User = sequelize.define('user', {
        pseudo: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: {
                name: 'user'

            }

        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: {
                name: 'User_pseudo'

            }

        },
        password: {
            type: DataTypes.CHAR(60),
            allowNull: false

        },
        isAdmin: {
            
            
//             NB: en test , je peux changer le isAdmin en true via la db , table user -> edit rows -> isAdmin a true 
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false

        }

    }, {
        // //si on souhaite avoir "createAt" mais pas "updateAt"
        timestamps: true,
        updatedAt: false

    });

    return User;

};
