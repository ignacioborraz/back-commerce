import MyRouter from "./router.js";
import AuthRouter from "./api/users.route.js";
import OrdersRouter from "./api/orders.route.js";
import FakeRouter from "./api/orders.fake.route.js";

import mailsController from "../controllers/mails.controller.js";

const auth = new AuthRouter();
const orders = new OrdersRouter();
const fake = new FakeRouter();

export default class IndexRouter extends MyRouter {
  init() {
    this.read("/", ["PUBLIC"], (req, res) =>
      res.status(200).send("TOY STORE API")
    );
    this.create("/mail", ["PUBLIC"], mailsController);
    this.use("/auth", ["PUBLIC"], auth.getRouter());
    this.use("/orders", ["PUBLIC"], orders.getRouter());
    this.use("/fake", ["PUBLIC"], fake.getRouter());
    this.read("/simple", ["PUBLIC"], (req, res) => {
      let total = 1;
      for (let i = 1; i < 100; i++) {
        total = i * i;
      }
      return res.status(200).send({ total });
    });
    this.read("/complex", ["PUBLIC"], (req, res) => {
      let total = 1;
      for (let i = 1; i < 1000000000; i++) {
        total = i * i;
      }
      return res.status(200).send({ total });
    });
  }
}
