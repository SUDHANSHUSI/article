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
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "BlogPost",
      },
    ],
  },
  { timestamps: true }
);

const TopicModel = mongoose.model("Topic", TopicSchema);

module.exports = TopicModel;
