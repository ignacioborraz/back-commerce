import { model, Schema, Types } from "mongoose";

let collection = "products";
let schema = new Schema({
  title: { type: String, required: true }, //cada propiedad necesita definir tipo de dato de JS y si es requerido
  description: { type: String, required: true },
  stock: { type: Number, required: true },
  url_photo: { type: String, required: true },
  price: { type: Number, required: true },
  admin_id: { type: Types.ObjectId, ref: "users", required: true },
});

//primero popular manual
//luego con middleware pre
//paginar con plugin

let Product = model(collection, schema);
export default Product;
