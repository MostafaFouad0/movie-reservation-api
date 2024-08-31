const express = require("express");
const router = express.Router();
const { checkToken } = require("../../middlewars/checkValidToken");
const { checkAdminToken } = require("../../middlewars/checkAdminToken");
const { makeReservations,getReservations } = require("../controllers/reservations_controllers");

router.post("/", checkToken, makeReservations);
router.get('/',checkToken,getReservations);

module.exports = router;
