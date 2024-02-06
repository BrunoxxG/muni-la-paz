const { Router } = require('express');
const router = Router();
const {verifyToken} = require('../jwt/jwt');
const {getUsersHandler, getUsersByNameHandler, updateUserHandler, createUserHandler, loginUserHandler} = require('../handlers');

router.get('/', verifyToken, getUsersHandler);
router.get('/name', verifyToken, getUsersByNameHandler);
router.patch('/:id', verifyToken, updateUserHandler);
router.post('/', verifyToken, createUserHandler);
router.post('/login', loginUserHandler);

module.exports = router;