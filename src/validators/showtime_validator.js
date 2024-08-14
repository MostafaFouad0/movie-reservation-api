const joi = require("joi");
const schema = joi.object({
  hall_id: joi.number().required().message({ msg: "hall id is required." }),
  movie_id: joi.number().required().message({ msg: "movie id is required." }),
  showtime_start: joi
    .date()
    .required()
    .message({ msg: "the start time of the show is required." }),
  showtime_end: joi
    .date()
    .required()
    .message({ msg: "the end time of the show is required." }),
  vip_seat_price: joi
    .number()
    .required()
    .message({ msg: "vip seat price for this show is required." }),
  regular_seat_price: joi
    .number()
    .required()
    .message({ msg: "regular seat price for this show is required." }),
});
module.exports = schema;
