"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MyCourse extends Model {
    static associate(models) {
      MyCourse.belongsTo(models.User);
      MyCourse.belongsTo(models.Course);
    }
  }
  MyCourse.init(
    {
      CourseId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Courses",
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
        },
      },
      isPay: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "MyCourse",
    }
  );
  MyCourse.beforeCreate((e) => {
    e.isPay = false;
  });
  return MyCourse;
};
