import { Schema, model } from "mongoose";

let collection = "movies";
let schema = new Schema({
  title: { type: String, required: true },
  photo: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  movie_length: { type: Number, required: true },
});

let Movie = model(collection, schema);
export default Movie;
