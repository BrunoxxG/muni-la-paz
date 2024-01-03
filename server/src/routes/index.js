const {Router} = require("express");
const mainRouter = Router();

const usersRouter = require('./users.router');
const complexesRouter = require('./complexes.router');

mainRouter.use('/users', usersRouter);
mainRouter.use('/complexes', complexesRouter)

module.exports = mainRouter;