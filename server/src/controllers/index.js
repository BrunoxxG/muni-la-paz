//COMPLEXES CONTROLLER
const getAllComplexesController = require('./complexes/getAllComplexes.controller');
const postComplexController = require('./complexes/postComplex.controller');


//USERS CONTROLLERS
const getUsersController = require('./users/getUsers.controller');
const createUserController = require('./users/createUser.controller');
const loginUserController = require('./users/loginUser.controller');
const updateUserController = require('./users/updateUser.controller');


module.exports = {
  getAllComplexesController,
  postComplexController,
  getUsersController,
  createUserController,
  loginUserController,
  updateUserController
};