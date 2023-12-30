require("dotenv").config();
const { Sequelize } = require("sequelize");
const UserModel = require("../models/User");
const PublicationModel = require("../models/Publication");
const CottageModel = require("../models/Cottage");
const ComplexModel = require("../models/Complex");

const sequelize = new Sequelize(process.env.DB, {
  logging: false,
  native: false,
  ssl: true,
});

UserModel(sequelize);
PublicationModel(sequelize);
CottageModel(sequelize);
ComplexModel(sequelize);

const { User, Publication, Cottage, Complex } = sequelize.models;

User.belongsToMany(Publication, { through: "user_publication", timestamps: false, tableName: 'users' });
Publication.belongsTo(User, { through: "user_publication", timestamps: false, tableName: 'publications' });
Complex.belongsToMany(Cottage, { through: "complex_cottage", timestamps: false, tableName: 'complex' });
Cottage.belongsTo(Complex, { through: "complex_cottage", timestamps: false, tableName: 'cottages' });

const dbConnection = async () => {
  try {
    await sequelize.sync({force: true});
    console.log("DB Connect");
  } catch (error) {
    throw new Error("Fail DB Connect");
  }
};

module.exports = { ...sequelize.models, dbConnection };

