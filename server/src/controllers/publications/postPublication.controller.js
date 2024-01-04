const { Publication } = require("../../db/connection");

module.exports = async (data) => {
  const newPublication = await Publication.create(data);
  return newPublication;
};