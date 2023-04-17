const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 9276;
const app = express();
const AppError = require("./utils/appError");
const articleRoutes = require("./routes/articleRoutes");
const userRoutes = require("./routes/userRoutes");
const topicRoutes = require("./routes/topicRoutes");
dotenv.config();

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection successfull..."))
  .catch((err) => console.log(err));

// Parse JSON request body
app.use(express.json());

// Use article routes
app.use("/articles", articleRoutes);
app.use("/topics", topicRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}....`);
});

app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
});
