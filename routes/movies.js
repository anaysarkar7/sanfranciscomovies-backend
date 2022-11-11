import express from "express";
const router = express.Router();
import { getAllMoviesList } from "../controllers/movies.js";

router.get("/getAllMoviesList", getAllMoviesList);

export default router;
