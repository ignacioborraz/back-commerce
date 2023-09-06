import { model, Schema } from "mongoose";

const collection = "carts";
const schema = new Schema({
  product_id: {},
  user_id: {},
  quantity: { type: Number, default: 1 },
});

//armar la referencia
//popular y popular lo populado (product_id => admin_id)

const Cart = model(collection, schema);
export default Cart;
