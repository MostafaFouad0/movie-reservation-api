const jwt = require("jsonwebtoken");
const { formatFailToJSend } = require("../apiResponsesTemplates/templates");
const { checkAdminRole } = require("../utils/checkAdminToken");
const { getPayload } = require("../auth/jwt_auth");
function checkAdminToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  const payload = getPayload(token);
  if (!checkAdminRole(payload))
    return res.status(401).json(formatFailToJSend("unauthorized"));
  next();
}

module.exports = { checkAdminToken };
