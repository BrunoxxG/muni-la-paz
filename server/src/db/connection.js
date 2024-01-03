require("dotenv").config();
const { Sequelize } = require("sequelize");
const UserModel = require("../models/User");
const PublicationModel = require("../models/Publication");
const RoomModel = require("../models/Room");
const ComplexModel = require("../models/Complex");

const {loadData} = require('../seeder/loadData');

const sequelize = new Sequelize(process.env.DB, {
  logging: false,
  native: false,
  ssl: true,
});

UserModel(sequelize);
PublicationModel(sequelize);
RoomModel(sequelize);
ComplexModel(sequelize);

const { User, Publication, Room, Complex } = sequelize.models;

User.belongsToMany(Publication, { through: "user_publication", timestamps: false, tableName: 'users' });
Publication.belongsTo(User, { through: "user_publication", timestamps: false, tableName: 'publications' });
Complex.belongsToMany(Room, { through: "complex_room", timestamps: false, tableName: 'complex' });
Room.belongsTo(Complex, { through: "complex_room", timestamps: false, tableName: 'room' });

const dbConnection = async () => {
  try {
    await sequelize.sync({force: true});
    console.log("DB Connect");
    await loadData(User, Publication, Room, Complex);
  } catch (error) {
    console.log(error)
    throw new Error("Fail DB Connect");
  }
};

module.exports = { ...sequelize.models, dbConnection };

