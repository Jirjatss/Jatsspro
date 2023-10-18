"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MyCourses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      CourseId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Courses",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
        },
      },
      isPay: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("MyCourses");
  },
};
