const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Castle extends Model {}

Castle.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    stampnumber: {
      type: DataTypes.STRING,
    },
    nameen: {
      type: DataTypes.STRING,
    },
    namejp: {
      type: DataTypes.STRING,
    },
    castlepic: {
      type: DataTypes.STRING,
    },
    stamppic: {
      type: DataTypes.STRING,
    },
    region: {
      type: DataTypes.STRING,
    },
    prefecture: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    condition: {
      type: DataTypes.STRING,
    },
    access: {
      type: DataTypes.STRING,
    },
    website: {
      type: DataTypes.STRING,
    },
    history: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "castle",
  }
);

module.exports = Castle;