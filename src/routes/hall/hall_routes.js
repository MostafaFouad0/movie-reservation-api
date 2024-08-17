const express = require("express");
const { checkHallInfo } = require("../../middlewars/validateRequestBody");
const { checkToken } = require("../../middlewars/checkValidToken");
const { addHall, getHalls } = require("../controllers/hall_controllers");
const router = express.Router();

router.get("/", checkToken, getHalls);
router.post("/", checkToken, checkHallInfo, addHall);

module.exports = router;
