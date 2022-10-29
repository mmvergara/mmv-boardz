const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Types } = Schema;

const messageSchema = new Schema(
  {
    messageAuthor: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    messageContent: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
