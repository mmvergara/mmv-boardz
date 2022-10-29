module.exports = (error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message || "Something went wrong in our server";
  res.status(status).json({ status, message, ok: false });
};
