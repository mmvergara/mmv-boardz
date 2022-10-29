const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Types } = Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  userpic: {
    type: String,
    default: "https://i.ibb.co/B2v65By/default.png",
  },
  password: {
    type: String,
    required: true,
  },
  posts: [{ type: Types.ObjectId, ref: "Post" }],
  messages: [{ type: Types.ObjectId, ref: "Message" }],
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
