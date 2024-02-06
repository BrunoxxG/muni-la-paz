require("dotenv").config();
const { Sequelize } = require("sequelize");
const { UserModel, PublicationModel, ComplexModel } = require('../models');

const { loadData } = require('../seeder/loadData');

const sequelize = new Sequelize(process.env.DB, {
  logging: false,
  native: false,
  ssl: true,
});

UserModel(sequelize);
PublicationModel(sequelize);
ComplexModel(sequelize);

const { User, Publication, Complex } = sequelize.models;

User.belongsToMany(Publication, { through: "user_publication", timestamps: false, tableName: 'users' });
Publication.belongsTo(User, { through: "user_publication", timestamps: false, tableName: 'publications' });

User.belongsToMany(Complex, { through: "user_complex", timestamps: false, tableName: 'users' });
Complex.belongsTo(User, { through: "user_complex", timestamps: false, tableName: 'complexes' });

const dbConnection = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("DB Connect");
    await loadData(User, Publication, Complex);
  } catch (error) {
    throw new Error("Fail DB Connect");
  }
};

module.exports = { ...sequelize.models, dbConnection };

