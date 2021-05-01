const errorHandler = (err, req, res, next) => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }

  console.error(err.stack);

  res.status(err.statusCode).json({
    status: false,
    error: err.message || "Internal server error!",
  });
};

module.exports = errorHandler;
