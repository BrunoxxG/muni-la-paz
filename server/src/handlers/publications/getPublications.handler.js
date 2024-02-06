const {getPublicationsController} = require('../../controllers');

module.exports = async (req, res) => {
  try {
    const { type } = req.query;
    console.log('TYPE',type)
    const allPublications = await getPublicationsController(type);
    res.status(200).json(allPublications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};