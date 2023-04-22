const mongoose = require("mongoose");

const likeDislikeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    like: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const LikeDislike = new mongoose.model("LikeDislike", likeDislikeSchema);

module.exports = LikeDislike;
