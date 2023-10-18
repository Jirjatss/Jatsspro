const express = require("express");
const CourseController = require("../controllers/course");
const { authenticationUser, authorizationAdmin } = require("../middlewares/auth");
const UserController = require("../controllers/User");
const router = express();

router.use(require("./mentor"));
router.get("/course", CourseController.getCourse);
router.get("/course/:id", CourseController.getCourseById);
router.use(require("./user"));
router.use(authenticationUser);
router.use(require("./userProfile"));
router.get("/student", authorizationAdmin, UserController.getStudents);
router.use(require("./course"));
router.use(require("./myCourse"));
router.use(require("./meeting"));

module.exports = router;
