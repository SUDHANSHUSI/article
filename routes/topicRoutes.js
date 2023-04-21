const express = require("express");
const router = express.Router();
const topicController = require("../Controllers/topicController");
const authController = require("../Controllers/authController");

// GET all topics
router.get("/topics", topicController.getAllTopics);

// CREATE a new topic
router.post("/topics", authController.protect, topicController.createTopic);

module.exports = router;
