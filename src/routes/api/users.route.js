import AuthController from "../../controllers/users.controller.js";
import MyRouter from "../router.js";

import is_valid_user from "../../middlewares/is_valid_user.js";

const controller = new AuthController();

export default class AuthRouter extends MyRouter {
  init() {
    this.create(
      "/register",
      ["PUBLIC"],
      is_valid_user,
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
    this.create("/login", ["PUBLIC"]);
    this.create("/signout", ["PUBLIC"]);
  }
}
