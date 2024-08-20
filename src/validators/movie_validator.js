const joi = require("joi");
const schema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  genre: joi.string().required(),
  age_restricted: joi.boolean().required(),
  poster: joi.string().required(),
  duration: joi.number().required(),
  release_date: joi.string().pattern(/^\d{4}\/\d{2}\/\d{2}$/).required(),
  end_date: joi.string().pattern(/^\d{4}\/\d{2}\/\d{2}$/).required(),
});
module.exports = schema;
