import MyRouter from "./router.js";
import AuthRouter from "./api/users.route.js";
import OrdersRouter from "./api/orders.route.js";

import mailsController from "../controllers/mails.controller.js";


const auth = new AuthRouter();
const orders = new OrdersRouter();

export default class IndexRouter extends MyRouter {
  init() {
    this.read("/", ["PUBLIC"], (req, res) =>
      res.status(200).send("TOY STORE API")
    );
    this.create("/mail", ["PUBLIC"], mailsController);
    this.use("/auth", ["PUBLIC"], auth.getRouter());
    this.use("/orders", ["PUBLIC"], orders.getRouter());
  }
}
