const { verifyToken } = require("../helpers/jwt");
const { User, UserProfile, MyCourse } = require("../models");

async function authenticationUser(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "unauthenticated" };
    }
    const data = verifyToken(access_token);

    const findUser = await User.findByPk(data.id);
    if (!findUser) {
      throw { name: "unauthenticated" };
    }

    req.user = {
      id: findUser.id,
      email: findUser.email,
      role: findUser.role,
    };
    next();
  } catch (err) {
    next(err);
  }
}

async function authorizationUser(req, res, next) {
  try {
    const id = req.params.id;
    const profile = await UserProfile.findByPk(id);
    if (!profile) throw { name: "profile_not_found" };

    const UserId = req.user.id;
    if (profile.UserId !== UserId) throw { name: "unauthorized" };
    next();
  } catch (error) {
    next(error);
  }
}
async function authorizationMyCourse(req, res, next) {
  try {
    const id = req.params.id;
    const mycourse = await MyCourse.findByPk(id);
    if (!mycourse) throw { name: "course_not_found" };

    const UserId = req.user.id;
    if (mycourse.UserId !== UserId) throw { name: "unauthorized" };
    next();
  } catch (error) {
    next(error);
  }
}

async function authorizationAdmin(req, res, next) {
  try {
    const userRole = req.user.role;
    console.log(userRole);
    if (userRole !== "Admin") throw { name: "unauthorized" };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authenticationUser,
  authorizationUser,
  authorizationAdmin,
  authorizationMyCourse,
};
