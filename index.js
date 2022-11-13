import "dotenv/config";
import express from "express";
import moviesRoutes from "./routes/movies.js";
import cors from "cors";
import autocompleteRoutes from "./routes/autocomplete.js";
import connectToMongo from "./db.js";

connectToMongo();
const app = express();
const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: "*",
  })
); // cross origin
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(express.json({ limit: "25mb" }));
app.use("/api", moviesRoutes);
app.use("/api", autocompleteRoutes);

app.listen(port, () => {
  console.log(`Backend API running`);
});
