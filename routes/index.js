const authRouter = require('./auth-router');
const categoryRouter = require('./category-router');
const messageRouter = require('./message-router');
const projectRouter = require('./project-router');
const subjectRouter = require('./subject-router');

const router = require('express').Router();
router.use('/auth', authRouter);
router.use('/category', categoryRouter);
router.use('/subject', subjectRouter);
router.use('/message', messageRouter);
router.use('/project', projectRouter);

module.exports = router;