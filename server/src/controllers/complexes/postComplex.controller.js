const { Complex } = require("../../db/connection");

module.exports = async (data) => {
  const newComplex = await Complex.create(data);
  return newComplex;
};