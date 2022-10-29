module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    const newErr = new Error("Session Expired! Try loggin in again");
    newErr.statusCode = 401
    throw newErr
  }
  next();
};
