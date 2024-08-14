const joi = require("joi");
const schema = joi.object({
  firstName: joi.string().min(3).required(),
  lastName: joi.string().min(3).required(),
  role: joi.string().required(),
  age: joi.number().required(),
  email: joi
    .string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  password: joi.string().min(8).required(),
});
module.exports = schema;
