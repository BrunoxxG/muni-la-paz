const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Document', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Documento"
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
    description: {
      type: DataTypes.STRING(4000),
      allowNull: false,
      defaultValue: ""
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    pdf: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
    check: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, { timestamps: false });
};