const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");

// *************************GET ALL USERS *****************************

const getAllUsers = catchAsync(async (req, res, next) => {
  const query = req.query.limit || 1;
  if (isNaN(query)) return next(new AppError("Query must be a Number"));

  const users = await User.find().limit(+query);
  if (users.length < query) {
    return next(
      new AppError(
        "Limit can't be greater than the total number of signed up users"
      )
    );
  }

  res.status(200).json({
    numberOfUsers: users.length,
    users,
  });
});

module.exports = {
  getAllUsers,
};
