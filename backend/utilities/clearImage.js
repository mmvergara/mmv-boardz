const fs = require("fs");
const path = require("path");

module.exports = async (filepath) => {
  const imgPath = path.join(__dirname + "\\..\\" + filepath);
  fs.promises.unlink(imgPath).catch((err) => {});
};
