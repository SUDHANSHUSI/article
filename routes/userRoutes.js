const express = require("express");
const userController = require("../Controllers/userController");
const authController = require("../Controllers/authController");

const router = express.Router();
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.route("/").get(userController.getAllUsers);

module.exports = router;
