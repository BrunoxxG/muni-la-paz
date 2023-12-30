const { Router } = require('express');
const router = Router();
const {verifyToken} = require('../jwt/jwt');
const { getUsers } = require('../controllers');

router.get('/', getUsers);

module.exports = router;