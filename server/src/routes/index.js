const {Router} = require("express");
const mainRouter = Router();

const usersRouter = require('./users.router');

mainRouter.use('/users', usersRouter);


module.exports = mainRouter;