import express from "express";
import authRoute from "./authRoute.js";
import categoryRoute from "./categoryRoute.js";
import productRoute from "./productRoute.js";

const router = express.Router();

router.use("/auth", authRoute);

router.use("/category", categoryRoute);

router.use("/product", productRoute);

export default router;
