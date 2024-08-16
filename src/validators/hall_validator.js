const joi = require("joi");

const schema = joi.object({
  title: joi.string().required(),
  vip_seats_cnt: joi.number().required(),
  regular_seats_cnt: joi.number().required(),
});
module.exports = schema;
