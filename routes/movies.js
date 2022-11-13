import express from "express";
const router = express.Router();
import {
  getAllMoviesList,
  addMoviesToDb,
  geocodeMoviesList,
} from "../controllers/movies.js";

router.get("/getAllMoviesList", getAllMoviesList);
router.post("/addMoviesToDb", addMoviesToDb);

export default router;
