const not_found_handler = (req, res, next) => {
  console.log(`not found ${req.method} ${req.url}`);
  return res.json({
    method: req.method,
    path: req.url,
    message: "not found",
  });
};

export default not_found_handler;
