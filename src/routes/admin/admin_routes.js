const express = require("express");
const { checkToken } = require("../../middlewars/checkValidToken");
const { changeToAdmin } = require("../controllers/admin_controllers");
const { checkAdminToken } = require("../../middlewars/checkAdminToken");
const router = express.Router();
router.use(express.json());

router.patch("/:user_id", checkToken, checkAdminToken, changeToAdmin);

module.exports = router;
