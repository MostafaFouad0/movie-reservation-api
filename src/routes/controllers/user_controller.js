const { PrismaClient } = require("@prisma/client");
const { generateToken } = require("../../auth/jwt_auth");
const { hashPassword, checkPassword } = require("../../utils/password_utils");
const { getPayload } = require("../../auth/jwt_auth");
const prisma = new PrismaClient();
const {
  formatErrorToJSend,
  formatSuccessToJSend,
  formatFailToJSend,
} = require("../../apiResponsesTemplates/templates");
const sigupUser = async (req, res) => {
  const newUserData = req.body;
  let user = await prisma.user.findFirst({
    where: {
      email: newUserData.email,
    },
  });
  // check if user's email already exists
  if (user) {
    return res.status(400).json(formatFailToJSend("Email already exists."));
  }

  // hashing user's password
  const hashed_password = await hashPassword(newUserData.password);
  newUserData.password = hashed_password;

  // storing the user's info in the database
  user = await prisma.user.create({
    data: newUserData,
  });
  return res
    .status(200)
    .json(formatSuccessToJSend("user created successfully, please login."));
};
const loginUser = async (req, res) => {
  const userCredentials = req.body;
  if (!userCredentials.email) {
    return res
      .status(400)
      .json(formatFailToJSend("email address is required."));
  }
  if (!userCredentials.password) {
    return res.status(400).json(formatFailToJSend("password is required."));
  }
  const user = await prisma.user.findFirst({
    where: {
      email: userCredentials.email,
    },
  });
  if (
    !user ||
    !user.active ||
    !(await checkPassword(userCredentials.password, user.password))
  ) {
    return res
      .status(400)
      .json(formatFailToJSend(" invalid email or password."));
  }

  const Payload = { id: user.id, role: user.role, email: user.email };
  // return the access token to the clinet
  res
    .status(200)
    .json(formatSuccessToJSend("all data are valid", generateToken(Payload)));
};
const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword)
    return res.status(400).json(formatFailToJSend("password is required"));
  if (!newPassword) {
    return res.status(400).json(formatFailToJSend("new password is required"));
  }
  if (newPassword.length < 8) {
    return res
      .status(400)
      .json(formatFailToJSend("new password must be atlease of size 8."));
  }
  // get the token
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];

  const payload = getPayload(token);

  const user = await prisma.user.findFirst({
    where: {
      id: payload.id,
    },
  });
  if (
    !user ||
    !user.active ||
    !(await checkPassword(oldPassword, user.password))
  )
    return res
      .status(400)
      .json(formatFailToJSend("invalid email or password."));

  const hashed_password = await hashPassword(newPassword);
  await prisma.user.update({
    where: {
      id: payload.id,
    },
    data: {
      password: hashed_password,
    },
  });
  return res
    .status(200)
    .json(formatSuccessToJSend("user password has been updated."));
};
module.exports = { sigupUser, loginUser, changePassword };
