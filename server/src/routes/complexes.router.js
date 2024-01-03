const { Router } = require('express');
const router = Router();
const {verifyToken} = require('../jwt/jwt');
const { getAllComplexesHandler } = require('../handlers/complexes/getAllComplexesHandler');
const { postComplexesHandler } = require('../handlers/complexes/postComplexesHandler');

router.get('/', getAllComplexesHandler);
router.post('/', postComplexesHandler)
//agregar un update

module.exports = router;