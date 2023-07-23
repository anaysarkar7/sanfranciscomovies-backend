import express from "express";
import autocompleteSearch from "../controllers/autocomplete.controller.js";
const router = express.Router();

router.post("/autocompleteSearch", autocompleteSearch);

export default router;
