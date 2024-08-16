const express = require("express");
const router = express.Router();
const { getMovies } = require("../controllers/movies_controllers");
const { checkToken } = require("../../middlewars/checkValidToken");

router.get("/", getMovies);

module.exports = router;
