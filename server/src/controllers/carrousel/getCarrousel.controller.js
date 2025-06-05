const { CarrouselImage } = require('../../db/connection');

module.exports = async () => {

  const imagesCarrousel = await CarrouselImage.findAll({ order: [['order', 'ASC']] });

  return imagesCarrousel;

};