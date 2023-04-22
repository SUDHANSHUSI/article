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
    blogTopic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const BlogPostModel = new mongoose.model("BlogPost", BlogPostSchema);

module.exports = BlogPostModel;


