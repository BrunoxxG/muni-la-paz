const { Publication } = require('../../db/connection');

module.exports = async (data, id) => {

  await Publication.update(data, { where: { id } });

  return;
};