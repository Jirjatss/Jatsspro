const express = require("express");
const MentorController = require("../controllers/mentor");
const router = express();

router.get("/mentor", MentorController.getMentor);

module.exports = router;
