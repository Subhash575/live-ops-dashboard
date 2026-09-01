import express from "express";
import { getBookings } from "../controllers/bookingController.js";

const router = express.Router();

router.get("/", getBookings);

export default router;
