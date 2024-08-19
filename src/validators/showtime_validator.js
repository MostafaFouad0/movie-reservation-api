const joi = require("joi");
const schema = joi.object({
  hall_id: joi.number().required(),
  movie_id: joi.number().required(),
  showtime_start:joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
  showtime_end: joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
  vip_seat_price: joi.number().required(),
  regular_seat_price: joi.number().required(),
});
module.exports = schema;
