const {getDocumentByIdController} = require('../../controllers');

module.exports = async (req, res) => {
  try {
    const documents = await getDocumentByIdController(req.params.id);
    res.status(200).json(documents);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};