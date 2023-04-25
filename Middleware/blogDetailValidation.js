const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const TopicModel = require("../models/topicModel");
const BlogPostModel = require("../models/blogModel");

const blogDetailValidation = catchAsync(async (req, res, next) => {
  const { title, author, content, blogTopic } = req.body;

  let missingValues = [];

  if (!title) missingValues.push("Title ");
  if (!author) missingValues.push("Author ");
  if (!content) missingValues.push("Content ");
  if (!blogTopic) missingValues.push("blogTopic ");

  if (missingValues.length > 0) {
    return next(
      new AppError(
        `required missing values : ${missingValues} is neccessary to be filled`,
        400
      )
    );
  }

  const topicName = await TopicModel.find({ name: req.body.blogTopic });
  // console.log(topicName);
  if (topicName.length == 0)
    return next(new AppError("Topic Name does not exist", 403));

  const blogName = await BlogPostModel.find({ title });
  // console.log(blogName);
  if (blogName.length > 0)
    return next(new AppError("Blog title must be unique", 403));

  next();
});


module.exports = blogDetailValidation;
