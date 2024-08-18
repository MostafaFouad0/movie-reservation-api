const { PrismaClient } = require("@prisma/client");
const { getPayload } = require("../../auth/jwt_auth");
const {
  formatErrorToJSend,
  formatSuccessToJSend,
  formatFailToJSend,
} = require("../../apiResponsesTemplates/templates");
const { checkAdminRole } = require("../../utils/checkAdminToken");
const prisma = new PrismaClient();

const getHalls = async (req, res) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;
  const halls = await prisma.hall.findMany({
    skip: skip,
    take: limit,
  });
  return res.status(200).json(formatSuccessToJSend("Data retrieved.", halls));
};

const addHall = async (req, res) => {
  const newHall = await prisma.hall.create({
    data: req.body,
  });
  res
    .status(200)
    .json(formatSuccessToJSend("hall created successfully", newHall));
};
module.exports = { addHall, getHalls };
