import "dotenv/config";
import express from "express";
import moviesRoutes from "./routes/movies.js";

const app = express();
const port = process.env.PORT || 8000;

app.use("/api", moviesRoutes);

app.listen(port, () => {
  console.log(`Backend API running`);
});
