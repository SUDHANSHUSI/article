const temp = (req, res, next) => {
  console.log("Hello from Middleware");
  next();
};

module.exports = temp;
