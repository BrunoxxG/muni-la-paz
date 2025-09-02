const {getCarrouselController} = require('../../controllers');

module.exports = async (req, res) => {
  try {
    const carrousel = await getCarrouselController();
    res.status(200).json(carrousel);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};