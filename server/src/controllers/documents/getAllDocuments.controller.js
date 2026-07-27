const { Document } = require("../../db/connection");

module.exports = async () => {
  
  const allDocuments = await Document.findAll({ order: [['id', 'DESC']] });

  return allDocuments;
};