import express from "express";

import orderRoutes from "./orderRoutes.js";
import cartRoutes from "./cartRoutes.js";
import productRoutes from "./productRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import userRouter from "./userRoutes.js";

const router = express.Router();

router.use("/order", orderRoutes);
router.use("/cart", cartRoutes);
router.use("/product", productRoutes);
router.use("/category", categoryRoutes);
router.use("/user", userRouter);

export default router;
