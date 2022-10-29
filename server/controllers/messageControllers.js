const userModel = require("../models/userModel");
const messageModel = require("../models/messageModel");
const newError = require("../utilities/newError");
const { validationResult } = require("express-validator");
const socketIO = require("../utilities/socketIO");

exports.getAllMessages = async (req, res, next) => {
  const result = await messageModel.find().populate("messageAuthor");
  res.status(200).send({ message: "Fetch Success", ok: true, data: result });
};

exports.putMessage = async (req, res, next) => {
  const { message } = req.body;
  const validationErrors = validationResult(req);
  const userId = req.session.userId;
  if (!validationErrors.isEmpty()) {
    next(newError("Invalid Input " + validationErrors.array()[0].msg, 422));
  }
  const foundUser = await userModel.findOne({ _id: userId });
  try {
    if (!foundUser) throw newError("No user", 401);
    const newMessage = new messageModel({ messageAuthor: foundUser._id, messageContent: message });
    await newMessage.save();
    const newMessageData = await newMessage.populate("messageAuthor");
    socketIO.getIO().emit("message", { action: "newMessage", data: newMessageData });
    res.status(200).send({ message: "Successfully added the message", ok: true });
  } catch (error) {
    next(error);
  }
};
exports.deleteMessage = async (req, res, next) => {
  const userId = req.session.userId;
  const { messageID } = req.params;
  const foundMessage = await messageModel.findOne({ _id: messageID });
  const foundUser = await userModel.findOne({ _id: userId });
  try {
    if (!foundUser) throw newError("Invalid User", 401);
    if (!foundMessage) throw newError("clould not foud image", 404);
    if (foundUser._id.toString() !== foundMessage.messageAuthor.toString())
      throw newError("Invalid User", 401);
    await foundMessage.delete();
    socketIO.getIO().emit("message", { action: "deletedMessage", data: foundMessage });
    res.status(200).send({ message: "Msg Deleted", ok: true });
  } catch (error) {
    next(error);
  }
};
