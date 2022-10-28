const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  putCreateBoardz,
  putComment,
  postLikeComment,
  getBoardz,
  postLikeBoardz,
  getSingleBoardz,
  deleteComment,
  deleteBoardz,getBoarzCount
} = require("../controllers/boardzController");

const isAuth = require("../middleware/isAuth");
router.get("/boardzlist", isAuth, getBoardz);
router.get("/count",isAuth,getBoarzCount)
router.get("/:boardId", isAuth, getSingleBoardz);
router.post("/like/:boardId", isAuth, postLikeBoardz);
router.put(
  "/createnewboardz",
  isAuth,
  [
    body("boardTitle").trim().isLength({ min: 8, max: 150 }).withMessage("Board Title is Invalid"),
    body("boardContent")
      .trim()
      .isLength({ min: 8, max: 3000 })
      .withMessage("Board Content is Invalid"),
  ],
  putCreateBoardz
);
router.put(
  "/comment/:boardId",
  body("commentContent")
    .trim()
    .isLength({ min: 4, max: 250 })
    .withMessage("Comment content is Invalid"),
  putComment
);
router.post("/like/comment/:commentId", isAuth, postLikeComment);
router.delete("/delete/boardz/:boardId", isAuth, deleteBoardz);
router.delete("/delete/comment/:commentId", isAuth, deleteComment);

module.exports = router;
