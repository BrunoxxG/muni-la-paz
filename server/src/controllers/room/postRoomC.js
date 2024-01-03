const { Complex, Room } = require("../../db/connection");

const postRoomC = async (id, title, description, type, capacity, images) => {
  //findbypk


    const newRoom = await Room.create({ title, description, type, capacity, images });

//await a la base de datos si esta el complex se lo asocio y retorno el complex nuevo

    return newRoom;
  } catch (error) {
    throw new Error(`Error al crear la habitación: ${error.message}`);
  }
};

module.exports = postRoomC;
// una vez creado el room se asocia a un complex por id 