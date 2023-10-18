"use strict";
const fs = require("fs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let courses = JSON.parse(fs.readFileSync("./db/course.json")).map((e) => {
      e.createdAt = e.updatedAt = new Date();
      e.status = false;
      return e;
    });

    let mentors = JSON.parse(fs.readFileSync("./db/mentor.json")).map((e) => {
      e.createdAt = e.updatedAt = new Date();
      return e;
    });

    await queryInterface.bulkInsert("Mentors", mentors);
    await queryInterface.bulkInsert("Courses", courses);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Courses");
    await queryInterface.bulkInsert("Mentors");
  },
};
