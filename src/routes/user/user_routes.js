const express = require("express");
const {
  sigupUser,
  loginUser,
  changePassword,
} = require("../controllers/user_controller");
const { checkUserInfo } = require("../../middlewars/checkUserInfo");
const { checkToken } = require("../../middlewars/checkValidToken");

const router = express.Router();
router.use(express.json());

router.post("/signup", checkUserInfo, sigupUser);
router.post("/login", loginUser);
router.post("/changepassword", checkToken, changePassword);

module.exports = router;
