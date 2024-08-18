const express = require("express");
const { checkHallInfo } = require("../../middlewars/validateRequestBody");
const { checkToken } = require("../../middlewars/checkValidToken");
const { addHall, getHalls } = require("../controllers/hall_controllers");
const { checkAdminToken } = require("../../middlewars/checkAdminToken");
const router = express.Router();

router.get("/", checkToken, checkAdminToken, getHalls);
router.post("/", checkToken, checkAdminToken, checkHallInfo, addHall);

module.exports = router;
