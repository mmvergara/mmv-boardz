const uniqid = require("uniqid");

exports.destination = (req, file, cb) => {
  cb(null, "images");
};
exports.filename = (req, file, cb) => {
  const nameArr = file.originalname.split(".");
  const extension = nameArr[nameArr.length - 1];
  cb(null, uniqid() + "." + extension);
};

exports.fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
