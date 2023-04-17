const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
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
    data: {
      user,
    },
  });
};

// ********************SIGNING UP USER***********************
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordconfirm,
  });
  createSendToken(newUser, 201, res);
});

// ********************LOGGING IN USER ************************
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //     const email = req.body.email;
  //     const password= req.body.password

  // 1)**********check if email and password exist**************

  // console.log(email+" "+password);
  if (!email || !password) {
    return next(new AppError("please provide email and password!", 400));
  }

  // 2)*******check if user exist and password is correct**********

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3)*********if everything is okay ,send token to the client********
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
  //   console.log(token);

  if (!token) {
    return next(
      new AppError("You are not logged in please login to get access.", 401)
    );
  }

  // 2)******************verification token************************
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decode);

  // 3)************check if user still exists******************
  const currentUser = await User.findById(decode.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token no longer exists", 401)
    );
  }
  // grant access to protected routes
  req.user = currentUser;
  
    console.log(req.user);
  next();
});
