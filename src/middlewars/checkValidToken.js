const jwt = require("jsonwebtoken");
const { formatFailToJSend } = require("../apiResponsesTemplates/templates");
function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // check if there is no token
  if (token == null)
    return res.status(401).json(formatFailToJSend("access token is required."));
  // verifying token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .json(formatFailToJSend("access denied due to invalid or expired token"));
    req.user = user;
    next();
  });
}

module.exports = { checkToken };
