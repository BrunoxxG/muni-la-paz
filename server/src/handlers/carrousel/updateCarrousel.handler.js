const { updateCarrouselController } = require('../../controllers');

module.exports = async (req, res) => {
  try {
    await updateCarrouselController(req.body, req.files);

    return res.status(200).json({ message: 'Update Complete' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error' });
  }
};