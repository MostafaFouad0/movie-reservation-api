const express = require("express");
const { checkToken } = require("../../middlewars/checkValidToken");
const { checkAdminToken } = require("../../middlewars/checkAdminToken");
const { addShowtime } = require("../controllers/showtime_controllers");
const { checkShowtimeInfo } = require("../../middlewars/validateRequestBody");
const router = express.Router();

router.post("/", checkToken, checkAdminToken, checkShowtimeInfo, addShowtime);

module.exports = router;
