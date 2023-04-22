const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");

// *************************GET ALL USERS *****************************

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    numberOfUsers: users.length,
    users,
  });
});

module.exports = {
  getAllUsers,
};
