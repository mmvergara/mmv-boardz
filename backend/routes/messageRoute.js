const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");
const { body } = require("express-validator");

const { deleteMessage, getAllMessages, putMessage } = require("../controllers/messageControllers");

router.get("/messages", isAuth, getAllMessages);

router.put(
  "/createnewmessage",
  isAuth,
  body("message")
    .trim()
    .isLength({ min: 1, max: 350 })
    .withMessage("Maximum message length is 350"),
  putMessage
);

router.delete("/delete/:messageID", isAuth, deleteMessage);

module.exports = router;
