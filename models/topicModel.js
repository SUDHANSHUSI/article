const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    topicName: {
      type: String,
      required: [true, "Topic name is required."],
      unique: true,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "User id is required."],
    },
  },
  {
    timestamps: true,
  }
);

const Topic = mongoose.model("topic", topicSchema);

module.exports = Topic;
