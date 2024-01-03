const postRoomC = require("../../controllers/room/postRoomC");

const postRoomHandler = async (req, res) => {
  const { title, description, type, capacity, images, } = req.body;
  try {
    const postRoom = await postRoomC(title, description, type, capacity, images);
    res.status(200).json(postRoom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { postRoomHandler } ;