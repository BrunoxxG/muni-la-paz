const { Complex, Room } = require("../../db/connection");

const postComplexC = async (name, description, address) => {
  const newComplex = await Complex.create({ name, description, address });
  console.log('NEWWWWCOMPLEX',newComplex)
//retorna solo el complejo creado
  });
};

module.exports = postComplexC;

// const { Complex, Room } = require("../../db/connection");

// const postRoomC = async (name, description, address, types) => {
//   try {
//     const newComplex = await Complex.create({ name, description, address });
//     console.log('NEWWWWCOMPLEX', newComplex);

//     const room = await Room.findOne({
//       where: { name: types }
//     });

//     if (room) {
//       await newComplex.addRoom(room);
//       return await Room.findByPk(newComplex.id, {
//         include: {
//           model: Room,
//           attributes: ["name"]
//         },
//       });
//     } else {
//       throw new Error("La sala no existe");
//     }
//   } catch (error) {
//     throw new Error(`Error al agregar la sala: ${error.message}`);
//   }
// };

// module.exports = postRoomC;
