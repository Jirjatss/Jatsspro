const express = require("express");
const router = express();
const UserController = require("../controllers/User");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/getOTP", UserController.getOTP);
router.post("/login", UserController.login);
router.post("/google-login", UserController.googleLogin);
router.get("/zoom-OAuth", UserController.zoom_OAuth);
router.get("/zoom-login", UserController.zoomLogin);

module.exports = router;
