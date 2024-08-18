const express = require("express");
const router = express.Router();
const { getMovies, addMovie } = require("../controllers/movies_controllers");
const { checkToken } = require("../../middlewars/checkValidToken");
const { checkMoiveInfo } = require("../../middlewars/validateRequestBody");
const { checkAdminToken } = require("../../middlewars/checkAdminToken");

router.get("/", getMovies);
router.post("/", checkToken, checkAdminToken, checkMoiveInfo, addMovie);

module.exports = router;
