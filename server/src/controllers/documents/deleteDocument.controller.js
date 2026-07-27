const { Document } = require('../../db/connection');

const fs = require('fs/promises');
const path = require('path');

module.exports = async (id) => {
  const document = await Document.findByPk(id);

  if (!document) {
    throw new Error('El documento no existe');
  }

  const documentPath = path.join(__dirname, '../../../public/documents', String(id));
  await fs.rm(documentPath, { recursive: true, force: true });

  await Document.destroy({ where: { id } });

  return;
};