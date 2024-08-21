const express = require("express");
const router = express.Router();
const { checkToken } = require("../../middlewars/checkValidToken");
const { checkAdminToken } = require("../../middlewars/checkAdminToken");
const { makeReservations } = require("../controllers/reservations_controllers");

router.post("/", checkToken, makeReservations);

module.exports = router;
