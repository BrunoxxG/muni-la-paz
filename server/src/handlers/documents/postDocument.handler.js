const { postDocumentController } = require('../../controllers');

module.exports = async (req, res) => {
  try {
    const postDocument = await postDocumentController(req.body, req.file, req.user.id);
    res.status(200).json(postDocument);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};