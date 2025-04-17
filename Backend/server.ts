import express from "express";
import cors from "cors";
import routes from "./src/router/api_routes/router.js";
import db from "./src/db/index.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/api", routes);

const server = app.listen(PORT, async () => {
  await db.connectDB();
  console.log(`Server running on port ${PORT}`);
});

process.on("SIGINT", async () => {
  await db.closeConn();
  server.close(() => {
    console.log("Server and DB connection closed");
    process.exit(0);
  });
});
