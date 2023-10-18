const { User } = require("../models");
const { signToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");
const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");
const { generateOTP, sendOTPByEmail } = require("../helpers/otp");
const clientID = process.env.ZOOM_CLIENT_ID;
const redirectURL = process.env.ZOOM_REDIRECT_URL;
const clientSecret = process.env.ZOOM_CLIENT_SECRET;

class UserController {
  static async getStudents(req, res, next) {
    try {
      const studens = await User.findAll({
        where: { role: "Student" },
      });
      res.json(studens);
    } catch (error) {
      next(error);
    }
  }
  static async register(req, res, next) {
    try {
      const { username, email, password, role } = req.body;
      const user = await User.create({ username, email, password, role: "Student" });
      res.status(201).json({ id: user.id, email });
    } catch (error) {
      next(error);
    }
  }

  static async getOTP(req, res, next) {
    const { email, password } = req.body;
    try {
      if (!email || !password) throw { name: "login_empty_field" };
      const user = await User.findOne({ where: { email } });
      if (!user) throw { name: "email_is_not_registered" };
      const passValid = comparePassword(password, user.password);
      if (!passValid) throw { name: "invalid_password" };
      const generate_otp = generateOTP();

      await user.update({ otp: generate_otp });

      await sendOTPByEmail(user.email, generate_otp);
      res.json({ message: "OTP dikirim" });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    const { email, password, otp } = req.body;

    try {
      if (!email || !password) throw { name: "login_empty_field" };
      const user = await User.findOne({ where: { email } });
      if (!user) throw { name: "email_is_not_registered" };
      const passValid = comparePassword(password, user.password);
      if (!passValid) throw { name: "invalid_password" };

      if (user.otp !== otp) throw { name: "invalid_otp" };
      const access_token = signToken({ id: user.id });
      res.status(200).json({ access_token, username: user.username, userRole: user.role });
    } catch (err) {
      next(err);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { google_token } = req.headers;
      const client = new OAuth2Client();
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      const [user, isCreated] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          username: payload.name,
          email: payload.email,
          password: "Sajad",
          role: "Student",
        },
        hooks: false,
      });
      const access_token = signToken({ id: user.id });
      let isStatus = 200;
      if (isCreated) isStatus = 201;

      res.status(isStatus).json({ access_token, username: payload.name, userRole: "Student" });
    } catch (err) {
      next(err);
    }
  }

  static async zoom_OAuth(req, res, next) {
    try {
      const url = `https://api.zoom.us/oauth/authorize?response_type=code&client_id=${clientID}&redirect_uri=${redirectURL}`;
      res.redirect(`${url}`);
    } catch (error) {
      next(error);
    }
  }

  static async zoomLogin(req, res, next) {
    try {
      const ZOOM_GET_AUTHCODE = "https://api.zoom.us/oauth/token?grant_type=authorization_code&code=";
      const ZOOM_AUTH = "https://api.zoom.us/oauth/authorize?response_type=code&client_id=";
      const authCode = req.query.code;

      if (authCode) {
        let url = ZOOM_GET_AUTHCODE + authCode + "&redirect_uri=" + redirectURL;
        const response = await axios.post(url, null, {
          auth: {
            username: clientID,
            password: clientSecret,
          },
        });
        const zoom_accessToken = response.data.access_token;
        const { data } = await axios({
          url: "https://api.zoom.us/v2/users/me",
          method: "get",
          headers: {
            Authorization: "Bearer " + zoom_accessToken,
          },
        });
        const [userzoom] = await User.findOrCreate({
          where: {
            email: data.email,
          },
          defaults: {
            username: data.first_name,
            email: data.email,
            password: "Sajad",
            role: "Admin",
          },
          hooks: false,
        });
        const access_token = signToken({ id: userzoom.id });
        return res.redirect(`https://jatsspro.web.app/admin/dashboard?zoom_access_token=${zoom_accessToken}&access_token=${access_token}&username=${userzoom.username}&userRole=${userzoom.role}`);
      }
      res.redirect(ZOOM_AUTH + clientID + "&redirect_uri=" + redirectURL);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
