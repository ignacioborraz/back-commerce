import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const auth = req.cookies;
  console.log(auth.token);
  if (!auth.token) {
    return res.status(401).json({
      success: false,
      response: "invalid credentials",
    });
  }
  const token = auth.token
  jwt.verify(token, process.env.SECRET_KEY, async (error, credentials) => {
    //credentials son los datos DESTOKENIZADOS del token
    try {
      let user = await User.findOne({ mail: credentials.mail });
      req.user = user;
      return next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        response: "invalid credentials",
      });
    }
  });
};
