const { Router } = require('express');
const router = Router();
const {verifyToken} = require('../jwt/jwt');
const {getUsersHandler, updateUserHandler, createUserHandler, loginUserHandler} = require('../handlers');

router.get('/', verifyToken, getUsersHandler);
router.patch('/:id', verifyToken, updateUserHandler);
router.post('/', verifyToken, createUserHandler);
router.post('/login', loginUserHandler);

module.exports = router;