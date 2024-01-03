const { Complex } = require("../../db/connection");

module.exports = async () => {
  const allComplexes = await Complex.findAll({
  });
  return allComplexes;
};