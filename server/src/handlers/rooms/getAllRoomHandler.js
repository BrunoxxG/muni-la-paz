const getAllRoomsC = require("../../controllers/room/getAllRoomsC");


const getAllRoomHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const allRoom = await getAllRoomsC(name);
    res.status(200).json(allRoom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = { getAllRoomHandler };