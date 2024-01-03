const { Room } = require("../../db/connection");

const getAllRoomsC = async (name) => {
  const allRoom = await Room.findAll({
    
  });
  return allRoom;
};

module.exports = getAllRoomsC;