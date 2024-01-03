const getAllComplexesC = require("../../controllers/complexes/getAllComplexesC");


const getAllComplexesHandler = async (req, res) => {
  // const { name } = req.query;
  try {
    const allComplexes = await getAllComplexesC();
    res.status(200).json(allComplexes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = { getAllComplexesHandler };