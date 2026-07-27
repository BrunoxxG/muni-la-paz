require("dotenv").config();
const { Sequelize } = require("sequelize");
const { UserModel, PublicationModel, ComplexModel, CarrouselImageModel, DocumentModel } = require('../models');

// const { loadData } = require('../seeder/loadData');

const sequelize = new Sequelize(process.env.DB, {
  logging: false,
  native: false,
  ssl: true,
});

UserModel(sequelize);
PublicationModel(sequelize);
ComplexModel(sequelize);
CarrouselImageModel(sequelize);
DocumentModel(sequelize);

const { User, Publication, Complex, Document } = sequelize.models;

Publication.belongsTo(User, { through: "user_publication", timestamps: false });
Complex.belongsTo(User, { through: "user_complex", timestamps: false });
Document.belongsTo(User, { through: "user_document", timestamps: false });

const dbConnection = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("DB Connect");
    // loadData(User, Publication, Complex);
  } catch (error) {
    throw new Error("Fail DB Connect");
  }
};

module.exports = { ...sequelize.models, dbConnection };

