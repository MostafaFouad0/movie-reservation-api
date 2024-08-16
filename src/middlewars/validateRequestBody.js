const { formatFailToJSend } = require("../apiResponsesTemplates/templates");
const user_schema = require("../validators/user_validator");
const movie_schema = require("../validators/movie_validator");
const hall_schema = require("../validators/hall_validator");
const showtime_schame = require("../validators/showtime_validator");
function checkUserInfo(req, res, next) {
  const { error } = user_schema.validate(req.body);
  if (error) {
    return res.status(400).json(formatFailToJSend(error.details[0].message));
  }
  next();
}
function checkMoiveInfo(req, res, next) {
  const { error } = movie_schema.validate(req.body);
  if (error) {
    return res.status(400).json(formatFailToJSend(error.details[0].message));
  }
  next();
}
function checkHallInfo(req, res, next) {
  const { error } = hall_schema.validate(req.body);
  if (error) {
    return res.status(400).json(formatFailToJSend(error.details[0].message));
  }
  next();
}
function checkShowtimeInfo(req, res, next) {
  const { error } = showtime_schame.validate(req.body);
  if (error) {
    return res.status(400).json(formatFailToJSend(error.details[0].message));
  }
  next();
}
module.exports = {
  checkUserInfo,
  checkMoiveInfo,
  checkHallInfo,
  checkShowtimeInfo,
};
