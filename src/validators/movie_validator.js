const joi = require("joi");
const schema = joi.object({
  title: joi.string().required().message({ msg: "movie title is required." }),
  desciption: joi
    .string()
    .required()
    .message({ msg: "movie desciption is required." }),
  genre: joi.string().required().message({ msg: "movie genre is required." }),
  age_restricte: joi
    .boolean()
    .required()
    .message({ msg: "please specify if the movie is age restricte or not." }),
  poster: joi.string().required().message({ msg: "movie poster is required." }),
  duration: joi
    .number()
    .required()
    .message({ msg: "duration of the movie is required." }),
  release_date: joi
    .date()
    .required()
    .message({ msg: "release date of the movie is required." }),
  end_date: joi
    .date()
    .required()
    .message({ msg: "end date of the movie is required." }),
});
module.exports = schema;
