const { Sequelize } = require('sequelize');
const commentaire = require('./commentaire');
const project = require('./project');

// Sequelize Initialization
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD,
    {
        host: process.env.DB_SERVER,
        port: process.env.DB_PORT,
        dialect: 'mssql',
        pool: {
            min: 0,
            max: 5,
            idle: 10_000,
            acquire: 30_000
        }
    }
);

// Create object DB
const db = {};

// Add instance of Sequelize
db.sequelize = sequelize;

// Add Models
db.Project = require('./project')(sequelize);
db.Commentaire = require('./commentaire')(sequelize);
db.User = require('./user')(sequelize);
db.Note = require('./note')(sequelize);
db.News = require('./news')(sequelize);
db.CategoryProject = require('./categoryProject')(sequelize);



//Add Association
//NB: pour l exemple de l association Project -> Commentaires on va appeler commentaires dans Project sous forme de number , c est une particularité des DB , aime recevoir en number et non en string . ds ce cas ci sous forme de tableau vide .

//- [One to Many] Commentaires - Project  
db.Project.hasMany(db.Commentaire, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE'
});
db.Commentaire.belongsTo(db.Project);


//- [one to many] news-notes  une news ou plusieurs news peuvent avoir une note d un member .   Many to Many ? 
db.News.hasMany(db.Note, {
    foreignKey: {
        allowNull: true
    },
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE'
});
db.Note.belongsTo(db.News);


// - [one to many] commentaire - user     un user peut mettre plusieurs commentaires
db.User.hasMany(db.Commentaire, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE'
});
db.Commentaire.belongsTo(db.User);


// - 1 user --> peut mettre une note --> sur une ou plusieurs news . 
// -[one to many] user-note  1 user can interact with many news 
db.User.hasMany(db.Note, {
    foreignKey: {
        allowNull: true
    },
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE'
});
db.Note.belongsTo(db.User);


db.Project.belongsToMany(db.Commentaire, { through: 'ProjectCommentaires' });
db.Commentaire.belongsToMany(db.Project, { through: 'ProjectCommentaires' });

db.User.belongsToMany(db.Commentaire, { through: 'UserCommentaires' });
db.Commentaire.belongsToMany(db.User, { through: 'UserCommentaires' });



module.exports = db;
