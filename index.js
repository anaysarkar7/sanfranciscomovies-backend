import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import autocompleteRoutes from "./routes/autocomplete.route.js";

const app = express();
const port = process.env.PORT;

// Rate limiter
const apiRequestLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per windowMs
  handler: (req, res) => {
    res.status(429).json({
      data: null,
      statusMessage: "API rate limit exceeded",
    });
  },
});

app.use(apiRequestLimiter);
app.use(
  cors({
    origin: [process.env.ORIGIN],
  })
);
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(express.json({ limit: "25mb" }));

app.use("/api/v1", autocompleteRoutes);

app.listen(port, () => {
  console.info(`Backend Service Online`);
});
