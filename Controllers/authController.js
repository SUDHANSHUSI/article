const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const bcrypt = require("bcryptjs");

// ***********************SIGN TOKEN****************************

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

// ********************SIGNING UP USER***********************

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
  });
  createSendToken(newUser, 201, res);
});

// ********************LOGGING IN USER ************************

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1)**********check if email and password exist**************

  if (!email || !password) {
    return next(new AppError("please provide email and password!", 400));
  }

  // 2)*******check if user exist and password is correct**********

  const user = await User.findOne({ email }).select("+password");

  const pass = await bcrypt.compare(password, user.password);

  if (!user || !pass) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3)*********if everything is okay ,send token to the client*******************

  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  //  1)************ Getting token and check if it's there*************
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in please login to get access.", 401)
    );
  }

  // 2)******************verification token************************

  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3)************check if user still exists******************

  const currentUser = await User.findById(decode.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token no longer exists", 401)
    );
  }
  // grant access to protected routes
  req.user = currentUser;
  next();
});
