const express = require("express");
const router = express.Router();
const { checkToken } = require("../../middlewars/checkValidToken");
const { addSeats } = require("../controllers/seats_controllers");
const { checkAdminToken } = require("../../middlewars/checkAdminToken");

router.post("/:hall_id", checkToken, checkAdminToken, addSeats);

module.exports = router;
