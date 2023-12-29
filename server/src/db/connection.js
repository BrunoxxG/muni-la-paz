require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB, {
  logging: false,
  native: false,
  ssl: true,
});

const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB Connect");
  } catch (error) {
    throw new Error("Fail DB Connect");
  }
};

module.exports = { dbConnection };

