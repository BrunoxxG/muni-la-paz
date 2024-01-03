//COMPLEXES HANDLERS
const getAllComplexesHandler = require('./complexes/getAllComplexes.handler');
const postComplexHandler = require('./complexes/postComplex.handler');

//PUBLICATIONS HANDLERS


//USERS HANDLERS
const getUsersHandler = require('./users/getUsers.handler');
const createUserHandler = require('./users/createUser.handler');
const loginUserHandler = require('./users/loginUser.handler');
const updateUserHandler = require('./users/updateUser.handler');

module.exports = {
  getAllComplexesHandler,
  postComplexHandler,
  getUsersHandler,
  createUserHandler,
  loginUserHandler,
  updateUserHandler
}