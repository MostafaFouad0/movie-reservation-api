const { PrismaClient } = require("@prisma/client");
const { generateToken } = require("../../auth/jwt_auth");
const { getPayload } = require("../../auth/jwt_auth");
const {
  formatErrorToJSend,
  formatSuccessToJSend,
  formatFailToJSend,
} = require("../../apiResponsesTemplates/templates");
const { checkAdminRole } = require("../../utils/checkAdminToken");
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

const addMovie = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];

  const payload = getPayload(token);
  if (!checkAdminRole(payload))
    res.status(401).json(formatFailToJSend("unauthorized"));
  const movie = await prisma.movie.create({
    data: req.body,
  });
  res
    .status(200)
    .json(formatSuccessToJSend("movie added successfully.", movie));
};

module.exports = { getMovies, addMovie };
