const { Router } = require('express');
const router = Router();
const { verifyToken } = require('../middlewares/jwt/jwt');
const { getAllDocumentsHandler, postDocumentHandler, getDocumentByIdHandler, updateDocumentHandler, deleteDocumentHandler } = require('../handlers');
const uploadPdf = require('../middlewares/upload/uploadPdf');

router.get('/', getAllDocumentsHandler);
router.get('/:id', getDocumentByIdHandler);
router.post('/', verifyToken, uploadPdf, postDocumentHandler);
router.patch('/:id', verifyToken, uploadPdf, updateDocumentHandler);
router.delete('/:id', verifyToken, deleteDocumentHandler);

module.exports = router;