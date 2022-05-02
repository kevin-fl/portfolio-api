const authRouter = require('./auth-router');
const projectRouter = require('./project-router');
const commentairesRouter = require('./commentaires-router');
const notesRouter = require('./notes-router');
const newsRouter = require('./news-router');

const router = require('express').Router();
router.use('/auth', authRouter);
router.use('/project', projectRouter);
router.use('/commentaires', commentairesRouter);
router.use('./notes', notesRouter);
router.use('./news', newsRouter);


module.exports = router;