import OrdersController from "../../controllers/orders.controller.js";
import MyRouter from "../router.js";

const controller = new OrdersController();

export default class OrdersRouter extends MyRouter {
  init() {
    //PARA CREAR UNA ORDEN DE UN USUARIO
    this.create("/", ["PUBLIC"], async (req, res, next) => {
      try {
        let data = {
          type: "mozzarella",
          size: "L",
          quantity: 10,
          price: 2,
          user_id: "651e1da14f530a963b7c5354",
        };
        let response = await controller.create(data);
        if (response) {
          return res.sendSuccessCreate(response);
        } else {
          return res.sendFailed();
        }
      } catch (error) {
        next(error);
      }
    });
    //PARA ACTUALIZAR UNA ORDEN
    this.update("/:id", ["PUBLIC"], async (req, res, next) => {
      try {
        let { id } = req.params;
        let data = req.body;
        let response = await controller.update(id, data);
        if (response) {
          return res.sendSuccess(response);
        } else {
          return res.sendNotFound("order");
        }
      } catch (error) {
        next(error);
      }
    });
    //PARA ELIMINAR UNA ORDEN
    this.destroy("/:id", ["PUBLIC"], async (req, res, next) => {
      try {
        let { id } = req.params;
        let response = await controller.destroy(id);
        if (response) {
          return res.sendSuccess(response);
        } else {
          return res.sendNotFound("order");
        }
      } catch (error) {
        next(error);
      }
    });
  }
}
