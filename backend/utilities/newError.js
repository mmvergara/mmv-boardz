module.exports = (errorMessage, errorCode) => {
  const newErr = new Error(errorMessage);
  newErr.statusCode = errorCode || 500;
  return newErr
};
