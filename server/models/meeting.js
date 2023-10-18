"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Meeting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Meeting.belongsTo(models.Course);
    }
  }
  Meeting.init(
    {
      CourseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: { msg: "Course already have a meeting" },
        references: {
          model: "Courses",
        },
        validate: {
          notEmpty: { msg: "CourseId is required" },
          notNull: { msg: "CourseId is required" },
        },
      },
      join_url: {
        type: DataTypes.STRING,
      },
      start_url: {
        type: DataTypes.TEXT,
      },
      zoom_id: {
        type: DataTypes.BIGINT,
      },
    },
    {
      sequelize,
      modelName: "Meeting",
    }
  );
  return Meeting;
};
