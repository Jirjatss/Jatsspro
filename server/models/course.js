"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Course.belongsTo(models.Mentor);
      Course.hasOne(models.Meeting);
      Course.hasMany(models.MyCourse);
    }
  }
  Course.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name is required" },
          notNull: { msg: "Name is required" },
        },
      },
      agenda: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Agenda is required" },
          notNull: { msg: "Agenda is required" },
        },
      },
      topic: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Topic is required" },
          notNull: { msg: "Topic is required" },
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "ImageUrl is required" },
          notNull: { msg: "ImageUrl is required" },
        },
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: { msg: "StartTime is required" },
          notNull: { msg: "StartTime is required" },
        },
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Duration is required" },
          notNull: { msg: "Duration is required" },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "price is required" },
          notNull: { msg: "price is required" },
        },
      },
      MentorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "MentorId is required" },
          notNull: { msg: "MentorId is required" },
        },
        references: {
          model: "Mentors",
        },
      },
      status: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  Course.beforeCreate((e) => {
    e.status = false;
  });
  return Course;
};
