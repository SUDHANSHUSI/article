const mongoose = require("mongoose");

const BlogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const BlogPostModel = new mongoose.model("BlogPost", BlogPostSchema);

module.exports = BlogPostModel;
