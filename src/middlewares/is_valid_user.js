import AuthService from "../services/users.service.js";

export default async function (req, res, next) {
  try {
    const User = new AuthService();
    const { mail } = req.body;
    let one = await User.readOne(mail);
    if (!one) {
      return next();
    } else {
      return res.status(400).json({
        method: req.method,
        path: req.url,
        message: "invalid user",
        response: null,
      });
    }
  } catch (error) {
    return next(error);
  }
}
