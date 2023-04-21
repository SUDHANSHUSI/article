const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TopicSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const TopicModel = new mongoose.model("Topic", TopicSchema);

module.exports = TopicModel;
