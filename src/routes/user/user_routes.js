const express = require("express");
const { sigupUser, loginUser } = require("../controllers/user_controller");
const { checkUserInfo } = require("../../middlewars/checkUserInfo");

const router = express.Router();
router.use(express.json());

router.post("/signup", checkUserInfo, sigupUser);
router.post("/login", loginUser);

module.exports = router;
