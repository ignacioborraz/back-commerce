import OrdersRepository from "../repositories/orders.rep.js";

export default class OrdersService {
  constructor() {
    this.repository = new OrdersRepository();
  }
  create = (data) => this.repository.create(data);
  read = (user_id) => this.repository.read(user_id);
  update = (id, data) => this.repository.update(id, data);
  destroy = (id) => this.repository.destroy(id);
  destroyAll = (user_id) => this.repository.destroyAll(user_id);
  readAll = (page) => this.repository.readAll(page);
}
