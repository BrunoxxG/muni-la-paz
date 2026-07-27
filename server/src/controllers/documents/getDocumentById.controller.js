const { Document } = require("../../db/connection");

module.exports = async (id) => {

  const document = await Document.findOne({ where: { id } });
  if (!document) throw new Error("There is no document with that ID");

  return document;
};