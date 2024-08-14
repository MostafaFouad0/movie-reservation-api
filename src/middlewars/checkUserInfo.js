const { formatFailToJSend } = require("../apiResponsesTemplates/templates");
const schema = require("../validators/user_validator");
function checkUserInfo(req, res, next) {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json(formatFailToJSend(error.details[0].message));
  }
  next();
}
module.exports = { checkUserInfo };
