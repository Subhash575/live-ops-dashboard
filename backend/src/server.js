import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import mechanicRoutes from "./routes/mechanicRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  }),
);

app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Instant Mechanic API is running",
  });
});

app.use("/api/bookings", bookingRoutes);
app.use("/api/mechanics", mechanicRoutes);
app.use("/api/customers", customerRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server start at PORT:${PORT}`);
  });
});
