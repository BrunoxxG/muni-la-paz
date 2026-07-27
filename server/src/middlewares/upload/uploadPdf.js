const multer = require("multer");

const upload = multer({ dest: 'public/documents/' });

module.exports = upload.single("pdf");
