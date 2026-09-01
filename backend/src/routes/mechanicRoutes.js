import express from "express";
import { getMechanics } from "../controllers/mechanicController.js";

const router = express.Router();

router.get("/", getMechanics);

export default router;
