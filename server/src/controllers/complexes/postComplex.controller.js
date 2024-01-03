const { Complex } = require("../../db/connection");

module.exports = async (name, description, address) => {
  const newComplex = await Complex.create({ name, description, address });
  return newComplex;
};