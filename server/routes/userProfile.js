const express = require("express");
const router = express();
const multer = require("multer");
const UserProfileController = require("../controllers/userProfile");
const { authorizationUser } = require("../middlewares/auth");
const upload = multer({ dest: "uploads/" });

router.post("/profile", upload.single("profileImage"), UserProfileController.createUserProfile);
router.get("/profile", UserProfileController.getUserProfile);
router.patch("/profile/:id", authorizationUser, upload.single("profileImage"), UserProfileController.editUserProfile);

module.exports = router;
