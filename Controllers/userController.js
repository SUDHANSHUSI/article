const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");

// *************************GET ALL USERS *****************************
const getAllUsers = catchAsync(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10; 
  const numberOfUsers = await User.countDocuments();
  
  if (limit > numberOfUsers) {
    throw new AppError('The requested limit exceeds the number of users in the database', 400);
  }
  const users = await User.find().limit(limit);
  res.status(200).json({
    numberOfUsers: users.length,
    users,
  });
});

module.exports = {
  getAllUsers,
};
