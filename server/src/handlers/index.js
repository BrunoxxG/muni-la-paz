//COMPLEXES HANDLERS
const getAllComplexesHandler = require('./complexes/getAllComplexes.handler');
const postComplexHandler = require('./complexes/postComplex.handler');
const getComplexesByNameHandler = require('./complexes/getComplexesByName.handler');
const getComplexByIdHandler = require('./complexes/getComplexById.handler');
const updateComplexHandler = require ('./complexes/updateComplex.handler');

//PUBLICATIONS HANDLERS
const getPublicationsHandler = require('./publications/getPublications.handler');
const getPublicationsByTitleHandler = require('./publications/getPublicationsByTitle.handler');
const getPublicationByIdHandler = require('./publications/getPublicationById.handler');
const postPublicationHandler = require('./publications/postPublication.handler');
const updatePublicationHandler = require('./publications/updatePublication.handler');

//USERS HANDLERS
const getUsersHandler = require('./users/getUsers.handler');
const createUserHandler = require('./users/createUser.handler');
const loginUserHandler = require('./users/loginUser.handler');
const updateUserHandler = require('./users/updateUser.handler');

module.exports = {
  getAllComplexesHandler,
  postComplexHandler,
  getComplexesByNameHandler,
  getComplexByIdHandler,
  updateComplexHandler,
  getPublicationsHandler,
  getPublicationsByTitleHandler,
  getPublicationByIdHandler,
  postPublicationHandler,
  updatePublicationHandler,
  getUsersHandler,
  createUserHandler,
  loginUserHandler,
  updateUserHandler
}