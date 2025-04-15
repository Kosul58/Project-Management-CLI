import express from "express";
import cors from "cors";
import orderRoutes from "./src/routes/orderRoutes.js";
import cartRoutes from "./src/routes/cartRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/orderroutes", orderRoutes);
app.use("/cartroutes", cartRoutes);
app.use("/productroutes", productRoutes);
app.use("/categoryroutes", categoryRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
