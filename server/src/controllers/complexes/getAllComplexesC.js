const { Complex, Room } = require("../../db/connection");

const getAllComplexesC = async (req,res) => {
  const allComplexes = await Complex.findAll({
    // include: {
    //   model: Room,
    //   attributes: ["name", "id"],
    //   through: {
    //     attributes: [],
    //   },
    // },
  });
  return allComplexes;
};

module.exports = getAllComplexesC;