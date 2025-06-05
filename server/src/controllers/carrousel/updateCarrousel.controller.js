const fs = require('fs/promises')
const path = require('path');
const { CarrouselImage } = require('../../db/connection');

module.exports = async (body, files) => {

  let { carrouselPreviews } = body;

  if (typeof carrouselPreviews === 'string') {
    try {
      carrouselPreviews = JSON.parse(carrouselPreviews);
    } catch (err) {
      carrouselPreviews = [];
    }
  }

  const imgFolder = await fs.readdir('./public/images/carrousel');
  const previewPaths = carrouselPreviews.map(img => img.path);
  const toDelete = imgFolder.filter(img => !previewPaths.includes(img));

  for (const imageName of toDelete) {
    const filePath = path.join('./public/images/carrousel', imageName);
    await fs.unlink(filePath);

    await CarrouselImage.destroy({
      where: {
        path: imageName
      }
    });
  }

  if (files) {
    for (const image of files) {
      const filename = image.originalname;
      const newPath = `./public/images/carrousel/${filename}`;

      await fs.mkdir(path.dirname(newPath), { recursive: true });
      await fs.rename(image.path, newPath);

      const found = Array.isArray(carrouselPreviews)
        ? carrouselPreviews.find((img) => img.path === filename)
        : null;

      const order = found?.order ?? 0;

      await CarrouselImage.create({
        path: filename,
        order
      });
    }
  }

  if (carrouselPreviews && Array.isArray(carrouselPreviews)) {
    for (let i = 0; i < carrouselPreviews.length; i++) {
      const imageName = carrouselPreviews[i].path;

      await CarrouselImage.update(
        { order: i + 1 },
        { where: { path: imageName } }
      );
    }
  }

  return;
};