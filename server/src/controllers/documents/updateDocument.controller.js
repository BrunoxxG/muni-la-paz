const { Document } = require('../../db/connection');

const fs = require('fs/promises')
const path = require('path');

module.exports = async (data, file, id) => {

  const document = await Document.findByPk(id);

  if (!document) {
    throw new Error("Documento no encontrado");
  }

  if (file) {

    const folderImgPath = path.join(__dirname, '../../../public/documents', String(id));

    const folderExists = await fs.access(folderImgPath).then(() => true).catch(() => false);

    if (folderExists) {
      await fs.rmdir(folderImgPath, { recursive: true });
    }

    const fileName = `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`;

    newPath = `./public/documents/${id}/${fileName}`;

    await fs.mkdir(path.dirname(newPath), { recursive: true });

    await fs.rename(file.path, newPath);

    newPath = newPath.substring(1);
    data.pdf = newPath;
  }

  await Document.update(data, { where: { id } });

  return;
};