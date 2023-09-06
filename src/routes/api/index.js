import { Router } from "express";
import fs_router from "./fs/index.js";
import mongo_router from "./mongo/index.js";

const router = Router();

router.use("/fs", fs_router);
router.use("/", mongo_router);

export default router;
