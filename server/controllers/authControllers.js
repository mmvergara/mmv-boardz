const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const newError = require("../utilities/newError");
const clearImage = require("../utilities/clearImage");

exports.putRegister = async (req, res, next) => {
  const validationErrors = validationResult(req);
  const { email, username, password } = req.body;

  try {
    if (email.includes(" ") || username.includes(" ") || password.includes(" ")) {
      const newErr = new Error("Spaces are not allowed in all fields");
      newErr.statusCode === 422;
      throw newErr;
    }
    const newUser = new userModel({
      email,
      password: await bcrypt.hash(password, 8),
      username,
      messages: [],
      posts: [],
    });
    if (!validationErrors.isEmpty()) {
      let data = "";
      validationErrors.array().forEach((x) => (data += x.msg + "\n"));
      const newErr = new Error(`Registration Unsuccessful + ${data}`);
      newErr.statusCode = 422;
      throw newErr;
    }

    const similarUsernameExist = userModel.findOne({ username: username });
    const similarEmailExist = userModel.findOne({ email: email });
    const foundSimilarities = await Promise.all([similarUsernameExist, similarEmailExist]);
    if (foundSimilarities[1] !== null) {
      const newErr = new Error("Email already exists, try a new one");
      newErr.statusCode = 422;
      throw newErr;
    }
    if (foundSimilarities[0] !== null) {
      const newErr = new Error("Username already exists, try a new one");
      newErr.statusCode = 422;
      throw newErr;
    }

    //Saving
    const saveResult = await newUser.save();
    res.status(201).send({
      message: "Registration Successful",
      ok: true,
    });
  } catch (err) {
    console.log("Something went wrong on authController putRegister");
    next(err);
  }
};
exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const validationErrors = validationResult(req);
  //Validation
  try {
    if (!validationErrors.isEmpty()) {
      let data = "";
      validationErrors.array().forEach((x) => (data += x.msg + "\n"));
      res.status(422).send({ message: "Login Unsuccessful", data });
    }
    if (email.includes(" ") || password.includes(" ")) {
      const newErr = new Error("Spaces are not allowed in all fields");
      errStatusCode === 422;
      throw newErr;
    }
    const foundUser = await userModel.findOne({ email: email });
    if (!foundUser) {
      const newErr = new Error("Invalid Email");
      newErr.statusCode = 422;
      throw newErr;
    }
    const comparisonResult = await bcrypt.compare(password, foundUser.password);
    if (!comparisonResult) {
      const newErr = new Error("Invalid Password");
      newErr.statusCode = 422;
      S;
      throw newErr;
    }
    req.session.isLoggedIn = true;
    req.session.userId = foundUser._id;
    res.status(200).send({
      message: "Login Successful",
      userData: {
        username: foundUser.username,
        userpic: foundUser.userpic,
        isAuthenticated: true,
        tokenExpirationDate: new Date(req.session.cookie._expires).getTime(),
      },
      ok: true,
    });
    return;
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    console.log("Something went wrong on authController postLogin");
    next(err);
    return err;
  }
};
exports.postLogout = (req, res, next) => {
  req.session.destroy(function (err) {
    // if(!!err) throw new Error('Could not Log out properly')
    res.status(200).send({ message: "Logged Out Successfully", ok: true });
  });
};
exports.patchChangePassword = async (req, res, next) => {
  const userId = req.session.userId;
  const { newPassword, oldPassword } = req.body;
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    let data = "";
    validationErrors.array().forEach((x) => (data += x.msg + "\n"));
    next(newError("Invalid Inputs " + data, 422));
  }

  const foundUser = await userModel.findOne({ _id: userId });
  try {
    if (!foundUser) {
      throw newError("User not found", 422);
    }
    const comparisonResult = await bcrypt.compare(oldPassword, foundUser.password);
    if (!comparisonResult) {
      throw newError("Wrong Password");
    }
    foundUser.password = await bcrypt.hash(newPassword, 8);
    await foundUser.save();
    res.status(200).send({ message: "Password Changed Successfully", ok: true });
  } catch (err) {
    console.log('Something wen"t wrong in patchChangePassowrd');
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};
exports.patchChangeUsername = async (req, res, next) => {
  const userId = req.session.userId;
  const { newUsername, password } = req.body;
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    let data = "";
    validationErrors.array().forEach((x) => (data += x.msg + "\n"));
    next(newError("Invalid Inputs " + data, 422));
    return;
  }
  const findUser = userModel.findOne({ _id: userId });
  const findSameUserName = userModel.findOne({ username: newUsername });
  const [foundUser, foundSameUsername] = await Promise.all([findUser, findSameUserName]);

  try {
    if (foundSameUsername) throw newError("Someone is already using that username", 422);
    if (!foundUser) throw newError("User not found", 422);

    const comparisonResult = await bcrypt.compare(password, foundUser.password);
    if (!comparisonResult) throw newError("Wrong Password");

    foundUser.username = newUsername;
    await foundUser.save();
    res.status(200).send({ message: "Success: Username Changed Successfully", ok: true });
  } catch (err) {
    console.log('Something wen"t wrong in patchChangeUsername');
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};
exports.patchChangeEmail = async (req, res, next) => {
  const userId = req.session.userId;
  const { newEmail, password } = req.body;
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    let data = "";
    validationErrors.array().forEach((x) => (data += x.msg + "\n"));
    next(newError("Invalid Inputs " + data, 422));
    return;
  }
  const findUser = userModel.findOne({ _id: userId });
  const findSameEmail = userModel.findOne({ email: newEmail });
  const [foundUser, foundSameEmail] = await Promise.all([findUser, findSameEmail]);

  try {
    if (foundSameEmail) throw newError("Someone is already using that Email", 422);
    if (!foundUser) throw newError("User not found", 422);

    const comparisonResult = await bcrypt.compare(password, foundUser.password);
    if (!comparisonResult) throw newError("Wrong Password");

    foundUser.email = newEmail;
    await foundUser.save();
    res.status(200).send({ message: "Success: Email Changed Successfully", ok: true });
  } catch (err) {
    console.log('Something wen"t wrong in patchChangeEmail');
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};
exports.patchChangeUserPic = async (req, res, next) => {
  if (!req.file) {
    next(newError("Invalid image or No image was sent"));
    return;
  }
  const userId = req.session.userId;
  const { path: imgPath } = req.file;
  if (!imgPath) {
    next(newError("Invalid image or No image was sent"));
    return;
  }
  const foundUser = await userModel.findOne({ _id: userId });
  await clearImage(foundUser.userpic);
  try {
    if (!foundUser) throw newError("User not found", 422);
    foundUser.userpic = imgPath;
    await foundUser.save();
    res.status(200).send({ message: "Success: Image Uploaded", ok: true, imgPath });
  } catch (error) {
    console.log('Something wen"t wrong in patchChangeEmail');
    next(error);
  }
};
