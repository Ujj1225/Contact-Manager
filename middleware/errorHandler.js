const errorHandler = (err, req, res, next) => {
  // This below syntax means if there is a statusCode give it res.statusCode
  // Else provide with the value 500
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case 400:
      res.json({
        title: "Validation Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case 404:
      res.json({
        title: "Not found!",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
        break;
  }
};
module.exports = errorHandler;
