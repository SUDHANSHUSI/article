const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const app = express();
const AppError = require("./utils/appError");
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");
const topicRoutes = require("./routes/topicRoutes");
const errorFormatter = require("./ErrorHandler/errorFormatter");
const dbConnect = require("./Config/dbConnect");

// Parse JSON request body
app.use(express.json());

dbConnect();
// Use article routes
app.use("/blogs", blogRoutes);
app.use("/users", userRoutes);
app.use("/topics", topicRoutes);

app.all("*", (req, res, next) => {
  return next(
    new AppError(`can't find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(errorFormatter);

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}....`);
});
