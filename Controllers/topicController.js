const topicModel = require("../models/topicModel");
const catchAsync = require("../utils/catchAsync");

// CREATE TOPIC
exports.createTopic = catchAsync(async (req, res) => {
  const topic = new topicModel(req.body);
  await topic.save();
  res.status(201).send(topic);
});

// GET ALL TOPICS
exports.getAllTopics = catchAsync(async (req, res) => {
  const topics = await topicModel.find();
  res.send(topics);
});
