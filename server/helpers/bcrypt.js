const bcrypt = require("bcryptjs");

function hashPassword(pw) {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(pw, salt);
}

function comparePassword(pw, hashedPw) {
  return bcrypt.compareSync(pw, hashedPw);
}

module.exports = {
  hashPassword,
  comparePassword,
};
