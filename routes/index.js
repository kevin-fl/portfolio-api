const authRouter = require('./auth-router');
const projectRouter = require('./project-router');
const commentaireRouter = require('./commentaire-router');
const noteRouter = require('./note-router');
const newsRouter = require('./news-router');

const router = require('express').Router();
router.use('/auth', authRouter);
router.use('/project', projectRouter);
router.use('/commentaire', commentaireRouter);
router.use('/note', noteRouter);
router.use('/news', newsRouter);


module.exports = router;