const { PrismaClient } = require("@prisma/client");
const { generateToken } = require("../../auth/jwt_auth");
const { getPayload } = require("../../auth/jwt_auth");
const {
  formatErrorToJSend,
  formatSuccessToJSend,
  formatFailToJSend,
} = require("../../apiResponsesTemplates/templates");
const prisma = new PrismaClient();

const getMovies = async (req, res) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;
  const movies = await prisma.movie.findMany({
    skip: skip,
    take: limit,
  });
  return res.status(200).json(formatSuccessToJSend("Data retrieved.", movies));
};

module.exports = { getMovies };
