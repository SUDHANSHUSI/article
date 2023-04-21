const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const blogDetailValidation = catchAsync(async (req, res, next) => {
  const { title, author, content } = req.body;

  let missingValues = [];

  if (!title) missingValues.push("Title ");
  if (!author) missingValues.push("Author ");
  if (!content) missingValues.push("Content ");

  if (missingValues.length > 0) {
    return next(
      new AppError(
        `required missing values : ${missingValues} is neccessary to be filled`,
        400
      )
    );
  }

  next();
});

module.exports = blogDetailValidation;
