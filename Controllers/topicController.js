const Topic = require("../models/topicModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

//*****************************  add topic name  *********************************

exports.createTopic = async (req, res, next) => {
  const existsTopic = await Topic.findOne({ topicName: req.body.topicName });

  if (existsTopic) {
    return next(
      new AppError(`Topic Name ${req.body.topicName} already exists`, 400)
    );
  }
console.log(req.user);
  const addTopic = {
    topicName: req.body.topicName,
    userId: req.user._id,
  };

  const topic = await Topic.create(addTopic);

  res.status(201).json({
    status: "Success",
    topic,
  });
};

//*****************************  get all topic  ********************************

exports.getAllTopics = async (req, res) => {
  // const topics = await Topic.find()

  const topics = await Topic.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        _id: {
          id: "$_id",
          topicName: "$topicName",
        },
        user: {
          _id: 1,
          name: 1,
          email: 1,
        },
      },
    },
  ]);

  res.status(200).json({
    status: "Success",
    length: topics.length,
    topics,
  });
};
