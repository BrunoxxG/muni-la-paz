const { Router } = require('express');
const router = Router();
const {verifyToken} = require('../jwt/jwt');
const { getAllRoomHandler } = require('../handlers/rooms/getAllRoomHandler');
const { postRoomHandler } = require('../handlers/rooms/postRoomHandler');

router.get('/', getAllRoomHandler);
router.post('/', postRoomHandler);

module.exports = router;