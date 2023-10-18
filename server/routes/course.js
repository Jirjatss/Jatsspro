const express = require("express");
const CourseController = require("../controllers/course");
const { authorizationAdmin } = require("../middlewares/auth");
const router = express();

router.post("/course", authorizationAdmin, CourseController.createCourse);
router.get("/admin/course/:id", authorizationAdmin, CourseController.getCourseByIdAdmin);

module.exports = router;
