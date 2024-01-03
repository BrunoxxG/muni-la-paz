//COMPLEXES CONTROLLER
const getAllComplexesController = require('./complexes/getAllComplexes.controller');
const postComplexController = require('./complexes/postComplex.controller');

//USERS CONTROLLERS
const getUsers = require('./users/getUsers');


module.exports = {
  getAllComplexesController,
  postComplexController,
  getUsers
};