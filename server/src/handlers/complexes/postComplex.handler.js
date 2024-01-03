const { postComplexController } = require('../../controllers');

module.exports = async (req, res) => {
  const { name, description, address, types } = req.body;
  try {
    const postComplex = await postComplexController(name, description, address, types);
    res.status(200).json(postComplex);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};