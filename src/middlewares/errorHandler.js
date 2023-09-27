const error_handler = (error, req, res, next) => {
  console.error(error);
  return res.status(500).json({
    method: req.method,
    path: req.url,
    message: error.message,
  });
};

export default error_handler;
