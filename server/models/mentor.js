"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Mentor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Mentor.hasMany(models.Course);
    }
  }
  Mentor.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name is required" },
          notNull: { msg: "Name is required" },
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Image is required" },
          notNull: { msg: "Image is required" },
        },
      },
      achievment: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Achievment is required" },
          notNull: { msg: "Achievment is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Mentor",
    }
  );
  return Mentor;
};
