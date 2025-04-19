const { Router } = require('express');
const router = Router();
const { verifyToken } = require('../middlewares/jwt/jwt');
const upload = require('../middlewares/upload/upload');
const { updateCarrouselHandler, getCarrouselHandler } = require('../handlers');

router.get('/', getCarrouselHandler);
router.patch('/', verifyToken, upload, updateCarrouselHandler);

module.exports = router;