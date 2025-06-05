const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('CarrouselImage', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, { timestamps: false });
};