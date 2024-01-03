const {Router} = require("express");
const mainRouter = Router();

const usersRouter = require('./users.router');
const complexesRouter = require('./complexes.router');
const roomsRouter = require('./rooms.router')

mainRouter.use('/users', usersRouter);

mainRouter.use('/complexes', complexesRouter)

mainRouter.use('/rooms', roomsRouter)

module.exports = mainRouter;