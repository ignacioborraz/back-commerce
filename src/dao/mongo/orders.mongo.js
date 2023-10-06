import { Types } from "mongoose";
import Order from "./models/Order.js";

export default class OrderMongo {
  constructor() {}
  async create(data) {
    let one = await Order.create(data);
    return {
      message: "order created",
      response: one._id,
    };
  }
  async read(user_id) {
    let all = await Order.find({ user_id }, "-createdAt -updatedAt -__v")
      .sort({ type: 1 })
      .populate("user_id", "mail");
    if (all.length > 0) {
      let ticket = await Order.aggregate([
        { $match: { user_id } },
        { $set: { subtotal: { $multiply: ["$price", "$quantity"] } } },
        { $group: { _id: "$user_id", total: { $sum: "$subtotal" } } },
        {
          $project: {
            _id: 0,
            user_id: "$_id",
            total: "$total",
            date: new Date(),
          },
        },
      ]);
      return {
        message: "orders read",
        response: all,
        ticket,
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
  async destroyAll(user_id) {
    let all = await Order.find(
      { user_id },
      "-createdAt -updatedAt -__v -user_id -_id"
    ).sort({ type: 1 });
    if (all.length > 0) {
      await Order.aggregate([
        { $match: { user_id } },
        { $set: { subtotal: { $multiply: ["$price", "$quantity"] } } },
        { $group: { _id: "$user_id", total: { $sum: "$subtotal" } } },
        { $set: { orders: all } },
        {
          $project: {
            _id: 0,
            user_id: "$_id",
            total: "$total",
            date: new Date(),
            orders: "$orders",
          },
        },
        { $merge: { into: "tickets" } },
      ]);
      await Order.deleteMany({ user_id });
      return {
        message: "orders destroyed",
        response: null,
      };
    } else {
      return null;
    }
  }
  async readAll(page) {
    let all = await Order.paginate({}, { page, limit: 10 });
    if (all) {
      return {
        message: "orders read",
        response: all,
      };
    } else {
      return null;
    }
  }
  async getGain(user_id) {
    //necesito el user_id para filtrar por usuario
    let orders = await Order.find({ user_id }, "type size quantity price -_id");
    let gain = await Order.aggregate([
      //0 filtrar por usuario/comprador
      //match requiere que pasemos el dato EXACTAMENTE IGUAL
      { $match: { user_id: new Types.ObjectId(user_id) } },
      //1 agregar propiedad subtotal = precio*cantidad
      { $set: { subtotal: { $multiply: ["$price", "$quantity"] } } },
      //2 sumar cada uno de los subtotales
      { $group: { _id: "$user_id", total: { $sum: "$subtotal" } } },
      //3 OPCIONAL subirlo a mongo PERO hay que hacerle algunas transformaciones
      {
        $project: {
          _id: 0,
          user_id: "$_id",
          total: "$total",
          date: new Date(),
          orders,
        },
      },
      //4 subir a mongo en una nueva colección
      { $merge: { into: "gains" } },
    ]);
    await Order.deleteMany({ user_id });
    return {
      response: gain,
      message: "get gain",
    };
  }
}
