const joi = require("joi");
const schema = joi.object({
  firstName: joi
    .string()
    .min(3)
    .required()
    .message({ msg: "First name is required." }),
  lastName: joi
    .string()
    .min(3)
    .required()
    .message({ msg: "Last name is required." }),
  role: joi.string().required().message({ msg: "the user role is required." }),
  age: joi.number().required().message({ msg: "user age is required." }),
  email: joi.string().required().message({ msg: "Email is required." }),
  password: joi
    .string()
    .min(8)
    .alphanum()
    .required()
    .message({ msg: "password must be atleast 8 charachters" }),
});
module.exports = schema;
