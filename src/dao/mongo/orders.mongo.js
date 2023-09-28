import Order from "./models/Order.js";

export default class OrderMongo {
  constructor() {}
  async create(data) {
    let one = await Order.create(data);
    return {
      message: "order created",
      response: "order_id: " + one._id,
    };
  }
  async read(user_id) {
    let all = await Order.find({ user_id }); //luego de enrutar POPULAR
    if (all.length > 0) {
      return {
        message: "orders read",
        response: all,
      };
    } else {
      return null;
    }
  }
  async update(id, data) {
    let one = await Order.findByIdAndUpdate(id, data, { new: true });
    if (one) {
      return {
        message: "order updated",
        response: one,
      };
    } else {
      return null;
    }
  }
  async destroy(id) {
    let one = await Order.findOneAndDelete({ _id: id });
    if (one) {
      return {
        message: "order deleted",
        response: one,
      };
    } else {
      return null;
    }
  }
}
