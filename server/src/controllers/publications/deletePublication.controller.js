const { Publication } = require('../../db/connection');

module.exports = async (id) => {
  const publication = await Publication.findByPk(id);

  if (!publication) {
    throw new Error('La publicación no existe');
  }

  await Publication.destroy({ where: { id } });

  return;
};