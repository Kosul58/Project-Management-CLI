import express from "express";
import cors from "cors";

import routes from "./src/router/api_routes/router.js"; // Adjust the path as needed

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
