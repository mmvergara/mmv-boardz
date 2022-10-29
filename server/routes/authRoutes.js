const express = require("express");
const router = express.Router();
const { body } = require("express-validator");


const isAuth = require("../middleware/isAuth");
const {
  postLogin,
  postLogout,
  putRegister,
  patchChangePassword,
  patchChangeUsername,
  patchChangeEmail,
  patchChangeUserPic,
} = require("../controllers/authControllers");

router.put(
  "/register",
  [
    body("email").trim().isEmail().normalizeEmail().withMessage("Email is Invalid"),
    body("username").trim().isLength({ min: 5, max: 20 }).withMessage("Username is Invalid"),
    body("password").trim().isLength({ min: 8, max: 30 }).withMessage("Password is Invalid"),
  ],
  putRegister
);
router.post(
  "/login",
  [
    body("email").trim().isEmail().normalizeEmail().withMessage("Email is Invalid"),
    body("password").trim().isLength({ min: 8, max: 30 }).withMessage("Password is Invalid"),
  ],
  postLogin
);
router.post("/logout", isAuth, postLogout);
router.patch(
  "/patch/password",
  [
    body("newPassword").trim().isLength({ min: 8, max: 30 }).withMessage("Password is Invalid"),
    body("oldPassword").trim().isLength({ min: 8, max: 30 }).withMessage("Password is Invalid"),
  ],
  isAuth,
  patchChangePassword
);
router.patch(
  "/patch/username",
  [
    body("password").trim().isLength({ min: 8, max: 30 }).withMessage("Password is Invalid"),
    body("newUsername").trim().isLength({ min: 5, max: 20 }).withMessage("New Username is Invalid"),
  ],
  isAuth,
  patchChangeUsername
);
router.patch(
  "/patch/email",
  [
    body("password").trim().isLength({ min: 8, max: 30 }).withMessage("Password is Invalid"),
    body("newEmail").trim().isEmail().normalizeEmail().withMessage("Email is Invalid"),
  ],
  isAuth,
  patchChangeEmail
);
router.patch("/patch/userpic", isAuth, patchChangeUserPic);

module.exports = router;
