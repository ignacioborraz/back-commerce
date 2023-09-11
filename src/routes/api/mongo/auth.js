import { Router } from "express";
//import User from "../../../models/user.model";
import is_form_ok from "../../../middlewares/is_form_ok.js";
import is_8_char from "../../../middlewares/is_8_char.js";
import create_hash from "../../../middlewares/create_hash.js";
//import is_valid_user from "../../../middlewares/is_valid_user.js";
import is_valid_pass from "../../../middlewares/is_valid_pass.js";
import passport from "passport";
import create_token from "../../../middlewares/create_token.js";
import verify_token_cookies from "../../../middlewares/verify_token_cookies.js";
import verify_token_local from "../../../middlewares/verify_token_local.js";

const router = Router();

/* router.post(
  "/register",
  is_form_ok,
  is_8_char,
  create_hash,
  async (req, res, next) => {
    try {
      let one = await User.create(req.body);
      return res.status(201).json({
        success: true,
        message: "user registered",
        user_id: one._id,
      });
    } catch (error) {
      next(error);
    }
  }
); */
router.post(
  "/register",
  is_form_ok,
  is_8_char,
  create_hash,
  passport.authenticate("register"),
  async (req, res, next) => {
    try {
      console.log(req.user);
      return res.status(201).json({
        success: true,
        message: "user registered",
        user_id: req.user._id,
      });
    } catch (error) {
      next(error);
    }
  }
);

/* router.post(
  "/login",
  is_8_char,
  is_valid_user,
  is_valid_pass,
  async (req, res, next) => {
    try {
      req.session.mail = req.body.mail;
      let one = await User.findOne({ mail: req.body.mail }); //documento de mongo con todas las propiedades del usuario
      req.session.role = one.role;
      return res.status(200).json({
        session: req.session,
        message: req.session.mail + " inicio sesión",
      });
    } catch (error) {
      next(error);
    }
  }
); */
router.post(
  "/login",
  is_8_char,
  passport.authenticate("login"),
  is_valid_pass,
  create_token,
  async (req, res, next) => {
    try {
      req.session.mail = req.body.mail;
      req.session.role = req.user.role;
      return res
        .status(200)
        .cookie("token", req.session.token, {
          maxAge: 60 * 60 * 24 * 7 * 1000,
          httpOnly: true,
        })
        .json({
          status: 200,
          user: req.user,
          //session: req.session,
          response: req.session.mail + " inicio sesión",
          token: req.session.token,
        });
    } catch (error) {
      next(error);
    }
  }
);

/* router.post(
  "/signout",
  verify_token_local,
  async (req, res, next) => {
    try {
      console.log(req.session);
      req.session.destroy();
      return res.status(200).json({
        status: 200,
        response: "sesion cerrada",
        session: req.session,
      });
    } catch (error) {
      next(error);
    }
  }
); */

/* router.post(
  "/signout",
  verify_token_cookies,
  async (req, res, next) => {
    try {
      console.log(req.session);
      console.log(req.cookies);
      req.session.destroy();
      return res.status(200).clearCookie("token").json({
        status: 200,
        response: "sesion cerrada",
        session: req.session,
      });
    } catch (error) {
      next(error);
    }
  }
); */

router.post(
  "/signout",
  passport.authenticate('jwt'),
  async (req, res, next) => {
    try {
      console.log(req.session);
      console.log(req.cookies);
      req.session.destroy();
      return res.status(200).clearCookie("token").json({
        status: 200,
        response: "sesion cerrada",
        session: req.session,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:mail"] }),
  (req, res) => {}
);
router.get(
  "/github/callback",
  passport.authenticate("github", {}),
  (req, res, next) => {
    try {
      req.session.mail = req.user.mail;
      req.session.role = req.user.role;
      return res.status(200).json({
        success: true,
        user: req.user,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
