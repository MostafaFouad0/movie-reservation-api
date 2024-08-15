const express = require("express");
const { checkToken } = require("../../middlewars/checkValidToken");
const { changeToAdmin } = require("../controllers/admin_controllers");

const router = express.Router();
router.use(express.json());

router.patch("/:user_id", checkToken, changeToAdmin);

module.exports = router;
