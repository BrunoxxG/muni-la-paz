const fs = require('fs/promises')
const path = require('path');

module.exports = async (body, files) => {

  const imgFolder = await fs.readdir('./public/images/carrousel');
  const imagePaths = imgFolder.map(filename => `/public/images/carrousel/${filename}`);

  let { carrouselPreviews } = body;

  if (typeof carrouselPreviews === 'string') {
    try {
      carrouselPreviews = JSON.parse(carrouselPreviews);
    } catch (err) {
      carrouselPreviews = [];
    }
  }

  const toDelete = imagePaths.filter(img => !carrouselPreviews.includes(img));

  for (const imagePath of toDelete) {
    const filePath = path.join('.', imagePath);
    await fs.unlink(filePath);
  }

  if (files) {
    for (const image of files) {
      let newPath = `./public/images/carrousel/${image.originalname}`;

      await fs.mkdir(path.dirname(newPath), { recursive: true });

      await fs.rename(image.path, newPath);
    }
  }

  return;
};