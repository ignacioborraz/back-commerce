import { compareSync } from "bcrypt";
import AuthService from "../services/users.service.js";

export default async function (req, res, next) {
  let password_from_form = req.body.password;
  const User = new AuthService();
  let user = await User.readOne(req.body.mail);
  let password_hash = user.password;
  if (password_hash) {
    let verified = compareSync(password_from_form, password_hash);
    if (verified) {
      return next();
    }
  }
  return res.status(400).json({
    method: req.method,
    path: req.url,
    message: "invalid credentials",
    response: null,
  });
}
