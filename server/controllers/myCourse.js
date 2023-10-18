const { Course, MyCourse, Meeting, Mentor, User } = require("../models");
const midtransClient = require("midtrans-client");
class MyCourseController {
  static async addMyCourse(req, res, next) {
    try {
      const { CourseId } = req.params;
      const UserId = req.user.id;
      const course = await Course.findByPk(CourseId);
      if (!course) throw { name: "course_not_found" };

      const myCourse = await MyCourse.create({ UserId, CourseId });
      res.status(201).json(myCourse);
    } catch (error) {
      next(error);
    }
  }
  static async getMyCourse(req, res, next) {
    try {
      const UserId = req.user.id;
      const myCourse = await MyCourse.findAll({
        where: { UserId },
        include: [
          {
            model: Course,
            include: [
              {
                model: Meeting,
              },
              {
                model: Mentor,
                attributes: ["name"],
              },
            ],
          },
        ],
      });
      res.json(myCourse);
    } catch (error) {
      next(error);
    }
  }

  static async deleteMyCourse(req, res, next) {
    try {
      const { id } = req.params;

      const mycourse = await MyCourse.findByPk(id);
      await mycourse.destroy();
      res.json({ message: "Success delete My Course" });
    } catch (error) {
      next(error);
    }
  }
  static async updateMyCourse(req, res, next) {
    try {
      const { id } = req.params;
      const mycourse = await MyCourse.findByPk(id);
      if (!mycourse) throw { name: "course_not_found" };

      mycourse.update({
        isPay: true,
      });
      res.json({ message: "Payment successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async generateMidtransToken(req, res, next) {
    const { id } = req.params;
    const mycourse = await MyCourse.findByPk(id, { include: Course });
    console.log(mycourse);

    const UserId = req.user.id;
    const user = await User.findByPk(UserId);

    if (mycourse.isPay) throw { name: "already_pay" };
    try {
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });
      let parameter = {
        transaction_details: {
          order_id: "Transaction_" + Math.floor(100000 + Math.random() * 900000),
          gross_amount: mycourse.Course.price,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          username: user.username,
          email: user.email,
        },
      };
      const midtransToken = await snap.createTransaction(parameter);
      res.status(201).json(midtransToken);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MyCourseController;
