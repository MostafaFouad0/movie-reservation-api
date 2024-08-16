const joi = require("joi");
const schema = joi.object({
  hall_id: joi.number().required(),
  movie_id: joi.number().required(),
  showtime_start: joi.date().required(),
  showtime_end: joi.date().required(),
  vip_seat_price: joi.number().required(),
  regular_seat_price: joi.number().required(),
});
module.exports = schema;
