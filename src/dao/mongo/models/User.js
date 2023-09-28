import { Schema, model } from "mongoose";

let collection = "users";
let schema = new Schema(
  {
    mail: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

let User = model(collection,schema)
export default User