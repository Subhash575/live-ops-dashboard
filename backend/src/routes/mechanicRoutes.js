import express from "express";
import {
  getMechanics,
  getMechanicById,
} from "../controllers/mechanicController.js";

const router = express.Router();

router.get("/", getMechanics);
router.get("/:id", getMechanicById);

export default router;
