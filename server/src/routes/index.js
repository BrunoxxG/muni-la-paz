const {Router} = require("express");
const mainRouter = Router();

const usersRouter = require('./users.router');
const complexesRouter = require('./complexes.router');
const publicationsRouter = require('./publications.router');
const carrouselRouter = require('./carrousel.router');

mainRouter.use('/users', usersRouter);
mainRouter.use('/complexes', complexesRouter);
mainRouter.use('/publications', publicationsRouter);
mainRouter.use('/carrousel', carrouselRouter);

module.exports = mainRouter;