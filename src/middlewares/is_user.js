import dao from "../dao/factory.js";
const { User } = dao;

export default async function (req, res, next) {
  try {
    const model = new User();
    const { mail } = req.body;
    let one = await model.readOne(mail);
    if (one) {
      req.user = one.response;
      return next();
    } else {
      return res.status(400).json({
        method: req.method,
        path: req.url,
        message: "invalid credentials",
        response: null,
      });
    }
  } catch (error) {
    return next(error);
  }
}
