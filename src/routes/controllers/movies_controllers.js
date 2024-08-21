const { PrismaClient } = require("@prisma/client");
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

const addMovie = async (req, res) => {
  if (new Date(req.body.release_date) >= new Date(req.body.end_date)) {
    return res
      .status(400)
      .json(formatFailToJSend("end date must be after the release date"));
  }
  const movie = await prisma.movie.create({
    data: req.body,
  });
  res
    .status(200)
    .json(formatSuccessToJSend("movie added successfully.", movie));
};

module.exports = { getMovies, addMovie };
