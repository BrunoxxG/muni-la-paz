const { Router } = require('express');
const router = Router();
const { verifyToken } = require('../jwt/jwt');
const { getAllComplexesHandler, postComplexHandler, getComplexesByNameHandler, getComplexByIdHandler, updateComplexHandler } = require('../handlers');

router.get('/', getAllComplexesHandler);
router.get('/name', getComplexesByNameHandler);
router.get('/:id', getComplexByIdHandler);
router.post('/', verifyToken, postComplexHandler);
router.patch('/:id', verifyToken, updateComplexHandler);

module.exports = router;