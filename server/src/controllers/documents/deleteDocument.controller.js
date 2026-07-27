const { Document } = require('../../db/connection');

const fs = require('fs/promises');
const path = require('path');

module.exports = async (id) => {
  const document = await Document.findByPk(id);

  if (!document) {
    throw new Error('El complejo no existe');
  }

  const imagePath = path.join(__dirname, '../../../public/images/documents', String(id));
  await fs.rm(imagePath, { recursive: true, force: true });

  await Document.destroy({ where: { id } });

  return;
};