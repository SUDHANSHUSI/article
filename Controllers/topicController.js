const topicModel = require("../models/topicModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// CREATE TOPIC
exports.createTopic = catchAsync(async (req, res, next) => {
  const { name, description } = req.body;

  if (!name || !description)
    return next(new AppError("Name and description are neccessary field", 400));

  const topic = new topicModel({
    name,
    description,
    user: req.user.id,
  });
  await topic.save();
  res.status(201).json(topic);
});

// GET ALL TOPICS
exports.getAllTopics = catchAsync(async (req, res, next) => {
  const topics = await topicModel.find();
  res.json(topics);
});
