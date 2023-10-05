import dao from "../dao/factory.js";
const { Order } = dao;

export default class OrdersRepository {
  constructor() {
    this.model = new Order();
  }
  create = (data) => this.model.create(data);
  read = (user_id) => this.model.read(user_id);
  update = (id, data) => this.model.update(id, data);
  destroy = (id) => this.model.destroy(id);
  destroyAll = (user_id) => this.model.destroyAll(user_id);
  readAll = (page) => this.model.readAll(page);
}
