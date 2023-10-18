const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_JWT;

function signToken(data) {
  return jwt.sign(data, secret);
}

function verifyToken(token) {
  return jwt.verify(token, secret);
}

module.exports = {
  signToken,
  verifyToken,
};
