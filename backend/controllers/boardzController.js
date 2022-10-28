const boardPostModel = require("../models/boardPostModel");
const userModel = require("../models/userModel");
const commentModel = require("../models/commentModel");
const newError = require("../utilities/newError");
const { validationResult } = require("express-validator");

exports.getBoardz = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.count || 3
  const boardList = await boardPostModel
    .find()
    .sort({ createdAt: -1 })
    .skip((currentPage - 1) * perPage)
    .populate("author")
    .populate("likes")
    .limit(perPage);
  try {
    if (!boardList) throw newError("Could not Fetch post list", 404);
    res.status(200).send({ ok: true, boardzList: boardList, message: "Fetch Success" });
  } catch (err) {
    console.log("Something went wrong on boardzController in getBoardz");
    next(err);
  }
};
exports.getBoarzCount = async (req, res, next) => {
  const result = await boardPostModel.count();
  res.status(200).send({ ok: true, mesage: "fetched", count: result || 0 });
};
exports.getSingleBoardz = async (req, res, next) => {
  const boardId = req.params.boardId;
  try {
    const boardPost = await boardPostModel
      .findOne({ _id: boardId })
      .populate("author")
      .populate("likes")
      .populate({ path: "comments" })
      .populate({
        path: "comments",
        populate: [
          {
            path: "commentLikes",
          },
          {
            path: "commentAuthor",
          },
        ],
      });
    if (!boardPost) throw newError("Failed to fetch post Details", 404);
    res.status(200).send({
      message: "success",
      ok: true,
      boardzData: boardPost,
    });
  } catch (err) {
    console.log("Something went wrong on boardzController in getSingleBoardz");
    next(err);
  }
};
exports.postLikeBoardz = async (req, res, next) => {
  const userId = req.session.userId;
  const boardId = req.params.boardId;
  const boardPost = await boardPostModel.findOne({ _id: boardId });
  try {
    if (!boardPost) throw newError("Post not found", 404);
    let message = "unLiked";
    if (boardPost.likes.includes(userId)) {
      boardPost.likes.pull(userId);
      await boardPost.save();
      message = "unLiked";
    } else {
      message = "Liked";
      boardPost.likes.push(userId);
      await boardPost.save();
    }
    let Likes = boardPost.likes.length;
    res.status(200).send({ message, ok: true, Likes });
  } catch (error) {
    console.log('Something wen"t wrong on postLikeBoardz');
    next(error);
  }
};
exports.putCreateBoardz = async (req, res, next) => {
  const userId = req.session.userId;
  const { boardContent, boardTitle } = req.body;
  const validationErrors = validationResult(req);
  const newBoardPost = new boardPostModel({
    author: userId,
    boardContent,
    boardTitle,
    comments: [],
  });
  if (!validationErrors.isEmpty()) {
    let data = "";
    validationErrors.array().forEach((x) => (data += x.msg + "\n"));
    next(newError("Invalid Inputs " + data, 422));
    return;
  }
  try {
    const foundUser = await userModel.findOne({ _id: userId });
    if (!foundUser) throw newError("Invalid User", 401);

    const savePostResult = await newBoardPost.save();
    foundUser.posts.push(savePostResult._id);
    await foundUser.save();
    res
      .status(200)
      .send({ savePostResult: savePostResult, ok: true, message: "Board Created Succesfully" });
  } catch (err) {
    console.log("Something went wrong on boardzController in putCreateBoardz");
    next(err);
  }
};
exports.putComment = async (req, res, next) => {
  const userId = req.session.userId;
  const boardId = req.params.boardId;
  const commentContent = req.body.commentContent;
  const validationErrors = validationResult(req);
  const newComment = new commentModel({
    commentLikes: [],
    commentAuthor: userId,
    commentContent,
    boardId,
  });
  try {
    if (!validationErrors.isEmpty()) {
      let data = " ";
      validationErrors.array().forEach((x) => (data += x.msg + "\n"));
      throw newError("Invalid Inputs " + data, 422);
    }
    const boardPost = await boardPostModel.findOne({ _id: boardId });
    boardPost.comments.push(newComment._id);
    const saveComment = newComment.save();
    const saveBoard = boardPost.save();
    const result = await Promise.all([saveComment, saveBoard]);
    res.status(200).send({
      message: "success",
      ok: true,
      data: result[0],
    });
  } catch (err) {
    console.log("Something went wrong on boardController putComment");
    next(err);
  }
};
exports.postLikeComment = async (req, res, next) => {
  const userId = req.session.userId;
  const commentId = req.params.commentId;
  const comment = await commentModel.findOne({ _id: commentId });
  try {
    if (!comment) throw newError("Comment not found", 422);
    if (comment.commentLikes.includes(userId)) {
      comment.commentLikes.pull(userId);
      await comment.save();
      res.status(200).send({ message: "unLiked", ok: true });
    } else {
      comment.commentLikes.push(userId);
      await comment.save();
      res.status(200).send({ message: "Liked", ok: true });
    }
  } catch (error) {
    console.log('Something wen"t wrong in postLikeComment');
    next(error);
  }
};
exports.deleteComment = async (req, res, next) => {
  const userId = req.session.userId;
  const commentId = req.params.commentId;
  const boardId = req.query.boardId;
  const comment = await commentModel.findOneAndRemove({ _id: commentId });
  const board = await boardPostModel.findOne({ _id: boardId });
  try {
    if (!comment || !board) throw newError("Board or Comment not found", 404);
    if (comment?.commentAuthor.toString() !== userId.toString())
      throw newError("You are not authorized to delete this comment", 401);
    board.comments.pull(commentId);
    await comment.delete();
    await board.save();
    res.status(200).send({ message: "Comment Delete", ok: true });
  } catch (error) {
    console.log("Something went wrong on boardController deleteComment");
    next(err);
  }
};
exports.deleteBoardz = async (req, res, next) => {
  const userId = req.session.userId;
  const boardId = req.params.boardId;
  const board = await boardPostModel.findOne({ _id: boardId });
  try {
    if (!board) throw newError("Board not found", 404);
    if (board.author.toString() !== userId.toString())
      throw newError("You are not authorized to delete this board", 404);
    await board.delete();
    res.status(200).send({ message: "Board was Deleted", ok: true });
  } catch (error) {
    console.log("Something went wrong on boardController deleteBoardz");
    next(err);
  }
};
