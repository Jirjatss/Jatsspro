const express = require("express");
const MeetingController = require("../controllers/meeting");
const { authorizationAdmin } = require("../middlewares/auth");
const router = express();

router.get("/meeting", MeetingController.getMeeting);
router.post("/meeting/:CourseId", authorizationAdmin, MeetingController.createMeeting);
router.delete("/meeting/:id/:zoomId", authorizationAdmin, MeetingController.deleteMeeting);

module.exports = router;
