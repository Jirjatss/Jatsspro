const express = require("express");
const MyCourseController = require("../controllers/myCourse");
const { authorizationMyCourse } = require("../middlewares/auth");
const router = express();

router.get("/mycourse", MyCourseController.getMyCourse);
router.post("/mycourse/:CourseId", MyCourseController.addMyCourse);
router.delete("/mycourse/:id", authorizationMyCourse, MyCourseController.deleteMyCourse);
router.patch("/mycourse/:id", authorizationMyCourse, MyCourseController.updateMyCourse);
router.post("/mycourse/payment/:id", authorizationMyCourse, MyCourseController.generateMidtransToken);

module.exports = router;
