const { postComplexController } = require('../../controllers');

module.exports = async (req, res) => {
  try {
    const postComplex = await postComplexController(req.body);
    res.status(200).json(postComplex);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};