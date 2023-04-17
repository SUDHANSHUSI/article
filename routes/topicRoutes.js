const express = require("express");
const topicController = require("../Controllers/topicController");
// const topicMiddleware = require('./../middleware/topicMiddleware');
const authController = require("../Controllers/authController");

const router = express.Router();
// router.use(authController.protect);
router.post("/", authController.protect, topicController.createTopic);
router.get("/", authController.protect, topicController.getAllTopics);

module.exports = router;
