const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Types } = Schema;

const commentSchema = new Schema(
  {
    commentAuthor: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    commentContent: { type: String, required: true },
    commentLikes: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
