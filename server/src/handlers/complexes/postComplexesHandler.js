const postComplexesC = require("../../controllers/complexes/postComplexesC");

const postComplexesHandler = async (req, res) => {
  const { name, description, address, types } = req.body;
  try {
    const postComplex = await postComplexesC(name, description, address, types);
    res.status(200).json(postComplex);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { postComplexesHandler } ;