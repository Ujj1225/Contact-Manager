const errorHandler =  (err, req, res, next) =>{
    // This below syntax means if there is a statusCode give it res.statusCode
    // Else provide with the value 500
    const statusCode = res.statusCode ? res.statusCode: 500;
    res.json({message: err.message, stackTrace: err.stack});
    
};
module.exports = errorHandler;