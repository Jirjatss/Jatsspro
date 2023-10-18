"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserProfile.belongsTo(models.User);
    }
  }
  UserProfile.init(
    {
      profileImage: {
        type: DataTypes.BLOB,
        allowNull: false,
        validate: {
          notEmpty: { msg: "ProfileImage is required" },
          notNull: { msg: "ProfileImage is required" },
        },
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Fullname is required" },
          notEmpty: { msg: "Fullname is required" },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Address is required" },
          notEmpty: { msg: "Address is required" },
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Gender is required" },
          notEmpty: { msg: "Gender is required" },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Phone is required" },
          notEmpty: { msg: "Phone is required" },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
        },
        allowNull: false,
        validate: {
          notNull: { msg: "UserId is required" },
          notEmpty: { msg: "UserId is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "UserProfile",
    }
  );
  return UserProfile;
};
