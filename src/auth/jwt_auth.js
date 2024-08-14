const jwt = require("jsonwebtoken");

function generateToken(payLoad) {
  const Token = jwt.sign(payLoad, process.env.JWT_SECRET, { expiresIn: "30m" });
  return { accessToken: Token };
}

function getPayload(Token) {
  return jwt.decode(Token);
}

module.exports = {
  getPayload,
  generateToken,
};
