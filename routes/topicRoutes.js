const express = require("express");
const router = express.Router();
const topicController = require("../Controllers/topicController");
const authController = require("../Controllers/authController");

//  ****************************GET ALL TOPICS************************

router.get("/getAllTopics", topicController.getAllTopics);

// ******************************CREATE TOPICS**************************

router.post("/createTopic", authController.protect, topicController.createTopic);

module.exports = router;
