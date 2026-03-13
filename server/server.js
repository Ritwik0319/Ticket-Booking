import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//cors configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ticket-booking-88lf.onrender.com",
    ],
    credentials: true,
  }),
);

// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Routes
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
