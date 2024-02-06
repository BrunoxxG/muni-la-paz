const { Complex } = require('../../db/connection');

module.exports = async (id) => {
  const complex = await Complex.findByPk(id);

  if (!complex) {
    throw new Error('El complejo no existe');
  }

  await Complex.destroy({ where: { id } });

  return;
};