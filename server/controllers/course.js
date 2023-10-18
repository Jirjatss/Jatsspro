const { Course, Mentor, Meeting, User, MyCourse } = require("../models");
class CourseController {
  static async getCourse(req, res, next) {
    try {
      const courses = await Course.findAll({
        include: [{ model: Mentor, attributes: ["name"] }],
      });
      res.json(courses);
    } catch (error) {
      next(error);
    }
  }

  static async getCourseById(req, res, next) {
    try {
      const { id } = req.params;
      const course = await Course.findByPk(id, {
        include: Mentor,
      });
      res.json(course);
    } catch (error) {
      next(error);
    }
  }
  static async getCourseByIdAdmin(req, res, next) {
    try {
      const { id } = req.params;
      const course = await Course.findByPk(id, {
        include: [
          {
            model: Mentor,
            attributes: ["name"],
          },
          {
            model: Meeting,
          },
          {
            model: MyCourse,
            include: [
              {
                model: User,
                attributes: ["email", "username"], // Tentukan atribut yang diinginkan di sini
              },
            ],
          },
        ],
      });
      if (!course) throw { name: "course_not_found" };

      res.send(course);
    } catch (error) {
      next(error);
    }
  }
  static async createCourse(req, res, next) {
    try {
      const { name, agenda, topic, start_time, duration, price, imageUrl, MentorId } = req.body;
      const newCourse = await Course.create({ name, agenda, topic, start_time, duration, price, imageUrl, MentorId });
      res.status(201).json(newCourse);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CourseController;
