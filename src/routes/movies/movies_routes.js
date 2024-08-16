const express = require("express");
const router = express.Router();
const { getMovies, addMovie } = require("../controllers/movies_controllers");
const { checkToken } = require("../../middlewars/checkValidToken");
const { checkMoiveInfo } = require("../../middlewars/validateRequestBody");

router.get("/", getMovies);
router.post("/", checkToken, checkMoiveInfo, addMovie);

module.exports = router;
