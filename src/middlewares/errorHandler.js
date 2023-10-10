const errorHandler = (error, req, res, next) => {
  return res.status(error.statusCode).json({
    method: req.method,
    path: req.url,
    message: error.message,
  });
};

export default errorHandler;
