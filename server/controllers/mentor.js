const { Mentor, Course } = require("../models");

class MentorController {
  static async getMentor(req, res, next) {
    try {
      const mentor = await Mentor.findAll({
        include: [{ model: Course }],
      });
      res.json(mentor);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = MentorController;
