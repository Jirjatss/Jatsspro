const { UserProfile } = require("../models");
const fs = require("fs");
class UserProfileController {
  static async createUserProfile(req, res, next) {
    try {
      const { fullname, phone, address, gender } = req.body;
      if (!req.file) throw { name: "No_files_were_uploaded." };
      const filePath = req.file.path;
      const profileImage = fs.readFileSync(filePath);

      const isReady = await UserProfile.findOne({ where: { UserId: req.user.id } });
      if (isReady) throw { name: "already_post" };
      const userProfile = await UserProfile.create({ profileImage, address: address, gender: gender, phone, fullname, UserId: req.user.id });
      res.status(201).json(userProfile);
    } catch (error) {
      next(error);
    }
  }
  static async getUserProfile(req, res, next) {
    try {
      const UserId = req.user.id;
      const userProfile = await UserProfile.findOne({ where: { UserId } });
      res.json(userProfile);
    } catch (error) {
      next(error);
    }
  }

  static async editUserProfile(req, res, next) {
    try {
      const { fullname, phone, address, gender } = req.body;
      if (!req.file) throw { name: "No_files_were_uploaded." };
      const filePath = req.file.path;
      const profileImage = fs.readFileSync(filePath);

      const newProfile = await UserProfile.update(
        {
          profileImage,
          address,
          gender,
          phone,
          fullname,
        },
        {
          where: {
            UserId: req.user.id,
          },
        }
      );
      res.status(200).json(newProfile);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserProfileController;
