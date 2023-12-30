const fs = require('fs');
const path = require('path');

const loadData = async (User, Publication, Room, Complex) => {
  try {
    const seeder = fs.readFileSync(path.resolve(__dirname, 'seeder.json'), 'utf-8');
    const { users, publications, rooms, complexes } = JSON.parse(seeder);

    await User.bulkCreate(users);
    await Publication.bulkCreate(publications);
    await Room.bulkCreate(rooms);
    await Complex.bulkCreate(complexes);

    console.log('Datos cargados correctamente.');
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
};

module.exports = { loadData };