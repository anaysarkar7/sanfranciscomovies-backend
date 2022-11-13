import express from "express";
const router = express.Router();
import { autocompleteSearch } from "../controllers/autocomplete.js";

router.post("/autocompleteSearch", autocompleteSearch);

export default router;
