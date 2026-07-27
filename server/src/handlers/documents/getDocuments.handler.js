const {getAllDocumentsController} = require('../../controllers');

module.exports = async (req, res) => {
  try {
    const allDocuments = await getAllDocumentsController();
    res.status(200).json(allDocuments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};