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
  const toDelete = imgFolder.filter(img => !carrouselPreviews.includes(img));

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

      await CarrouselImage.create({
        path: filename,
        order: 0
      });
    }
  }

  if (carrouselPreviews && Array.isArray(carrouselPreviews)) {
    for (let i = 0; i < carrouselPreviews.length; i++) {
      const imageName = carrouselPreviews[i];

      await CarrouselImage.update(
        { order: i + 1 },
        { where: { path: imageName } }
      );
    }
  }

  return;
};