const joi = require("joi");
const schema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  genre: joi.string().required(),
  age_restricted: joi.boolean().required(),
  poster: joi.string().required(),
  duration: joi.number().required(),
  release_date: joi.date().required(),
  end_date: joi.date().required(),
});
module.exports = schema;
