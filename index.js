import "dotenv/config";
import express from "express";
import cors from "cors";
import autocompleteRoutes from "./routes/autocomplete.route.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: ["http://localhost:3000", "https://anaysarkar7.github.io"],
  })
);

app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(express.json({ limit: "25mb" }));

app.use("/api", autocompleteRoutes);

app.listen(port, () => {
  console.info(`Backend Service Online`);
});
