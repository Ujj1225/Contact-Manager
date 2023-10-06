const {constants} = require('../constants');
const errorHandler = (err, req, res, next) => {
  // This below syntax means if there is a statusCode give it res.statusCode
  // Else provide with the value 500
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "VALIDATION_ERROR",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "NOT_FOUND!",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "UNAUTHORIZED!",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: "FORBIDDEN!",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "SERVER_ERROR!",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      console.log("No error, All good!")
      break;
  }
};
module.exports = errorHandler;
