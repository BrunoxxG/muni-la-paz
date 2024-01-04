const { Router } = require('express');
const router = Router();
const { verifyToken } = require('../jwt/jwt');
const { getPublicationsHandler, postPublicationHandler, getPublicationsByTitleHandler, getPublicationByIdHandler, updatePublicationHandler } = require('../handlers');

router.get('/', getPublicationsHandler);
router.get('/title', getPublicationsByTitleHandler);
router.get('/:id', getPublicationByIdHandler);
router.post('/', verifyToken, postPublicationHandler);
router.patch('/:id', verifyToken, updatePublicationHandler);

module.exports = router;