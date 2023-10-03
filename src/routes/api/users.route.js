import AuthController from "../../controllers/users.controller.js";
import MyRouter from "../router.js";

import is_valid_user from "../../middlewares/is_valid_user.js";
import is_user from "../../middlewares/is_user.js";
import is_valid_pass from "../../middlewares/is_valid_pass.js";
import create_token from "../../middlewares/create_token.js";
import passport from "passport";

const controller = new AuthController();

export default class AuthRouter extends MyRouter {
  init() {
    this.create(
      "/register",
      ["PUBLIC"],
      is_valid_user, // OTRA OPCION passport.authenticate('login')
      async (req, res, next) => {
        try {
          let data = req.body;
          let response = await controller.register(data);
          if (response) {
            return res.sendSuccessCreate(response);
          } else {
            return res.sendNotFound("user");
          }
        } catch (error) {
          next(error);
        }
      }
    );
    this.create(
      "/login",
      ["PUBLIC"],
      is_user, //passport.authenticate('login')
      is_valid_pass,
      create_token,
      async (req, res, next) => {
        try {
          req.session.mail = req.body.mail;
          req.session.role = req.user.role; //lo inyecta el middleware o passport
          const controller = new AuthController();
          let response = await controller.login();
          if (response) {
            return res
              .cookie("token", req.token, {
                maxAge: 60 * 60 * 24 * 7 * 1000,
                httpOnly: true,
              })
              .sendSuccess(response);
          } else {
            return res.sendNotFound("user");
          }
        } catch (error) {
          next(error);
        }
      }
    );
    this.create("/signout", ["PUBLIC"],passport.authenticate('jwt'),async(req,res,next)=> {
      try {
        req.session.destroy()
        let controller = new AuthController()
        let response = await controller.signout()
        if (response) {
          return res.clearCookie('token').sendSuccess(response)
        } else {
          return res.clearCookie('token').sendNotFound('user')
        }
      } catch (error) {
        next(error)
      }
    })
  }
}
