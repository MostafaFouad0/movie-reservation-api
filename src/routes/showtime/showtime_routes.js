const express = require("express");
const { checkToken } = require("../../middlewars/checkValidToken");
const { checkAdminToken } = require("../../middlewars/checkAdminToken");
const {
  addShowtime,
  getShowtimes,
} = require("../controllers/showtime_controllers");
const { checkShowtimeInfo } = require("../../middlewars/validateRequestBody");
const router = express.Router();

router.post("/", checkToken, checkAdminToken, checkShowtimeInfo, addShowtime);
router.get("/:movie_id", getShowtimes);
module.exports = router;
