const express = require("express");
const { checkToken } = require("../../middlewars/checkValidToken");
const { checkAdminToken } = require("../../middlewars/checkAdminToken");
const {
  addShowtime,
  getShowtimes,
  deleteShowtime,
} = require("../controllers/showtime_controllers");
const { checkShowtimeInfo } = require("../../middlewars/validateRequestBody");
const router = express.Router();

router.post("/", checkToken, checkAdminToken, checkShowtimeInfo, addShowtime);
router.get("/:movie_id", getShowtimes);
router.delete("/:showtime_id", deleteShowtime);
module.exports = router;
