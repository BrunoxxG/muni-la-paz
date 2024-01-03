const { Router } = require('express');
const router = Router();
const {verifyToken} = require('../jwt/jwt');
const { getUsers } = require('../controllers');
const updateUsers = require('../controllers/users/updateUsers');
const createUsers = require('../controllers/users/createUser');
const loginUsers = require('../controllers/users/loginUsers');

router.get('/', verifyToken, getUsers);
router.patch('/:id', verifyToken, updateUsers);
router.post('/', verifyToken, createUsers);
router.post('/login', loginUsers);

module.exports = router;