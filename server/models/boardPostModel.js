const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Types } = Schema;

const boardPostSchema = new Schema(
  {
    author: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    boardTitle: {
      type: String,
      required: true,
    },
    boardContent: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    isSharedPost: {
      originalAuthor: {
        type: Types.ObjectId,
        ref: "User",
      },
      originalPostId: {
        type: String,
      },
    },
    comments: [
      {
        type: Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("boardPost", boardPostSchema);
