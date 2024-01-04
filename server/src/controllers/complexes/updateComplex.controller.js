const { Complex } = require('../../db/connection');

module.exports = async (data, id) => {

  await Complex.update(data, { where: { id } });

  return;
};