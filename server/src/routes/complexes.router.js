const { Router } = require('express');
const router = Router();
const { verifyToken } = require('../jwt/jwt');
const { getAllComplexesHandler, postComplexHandler } = require('../handlers');

// const { getAllComplexesHandler } = require('../handlers/complexes/getAllComplexes.handler');
// const { postComplexesHandler } = require('../handlers/complexes/postComplex.handler');

router.get('/', getAllComplexesHandler);
router.post('/', postComplexHandler)
//agregar un update

module.exports = router;