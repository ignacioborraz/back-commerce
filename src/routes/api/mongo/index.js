import { Router } from "express";
import auth_router from "./auth.js";
import products_router from "./products.js";
import carts_router from "./carts.js";
import MovieRouter from "./movies.router.js";
const movies = new MovieRouter();
const movies_router = movies.getRouter();

const router = Router();

router.use("/auth", auth_router);
router.use("/products", products_router);
router.use("/carts", carts_router);
router.use("/movies", movies_router);

export default router;
