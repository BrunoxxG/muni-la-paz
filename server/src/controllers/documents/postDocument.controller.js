const { Document, User } = require("../../db/connection");

const fs = require('fs/promises')
const path = require('path');

module.exports = async (body, file, id) => {
  const newDocument = await Document.create(body);

  let newPath = "";

  if (file) {
    const fileName = `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`;

    newPath = `./public/documents/${newDocument.id}/${fileName}`;

    await fs.mkdir(path.dirname(newPath), { recursive: true });

    await fs.rename(file.path, newPath);

    newPath = newPath.substring(1);
  }

  await newDocument.update({
    pdf: newPath,
  });


  const associatedUser = await User.findOne({ where: { id } })
  await newDocument.setUser(associatedUser);

  return newDocument;
};