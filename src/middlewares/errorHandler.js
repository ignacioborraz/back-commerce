const errorHandler = (error, req, res, next) => {
  console.log("entró al middleware de manejo de errores");
  return res.status(error.statusCode).json({
    method: req.method,
    path: req.url,
    message: error.message,
  });
};

export default errorHandler;
