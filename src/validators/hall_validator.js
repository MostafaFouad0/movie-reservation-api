const joi = require("joi");

const schema = joi.object({
  title: joi.string().required().message({ msg: "hall title is required." }),
  vip_seats_cnt: joi
    .number()
    .required()
    .message({ msg: "number of VIP seats is required." }),
  regular_seats_cnt: joi
    .number()
    .required()
    .message({ msg: "number of regular seats is required." }),
});
module.exports = schema;
