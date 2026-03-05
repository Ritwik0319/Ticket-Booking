import express from "express";
import {
  getMyBookings,
  holdSeats,
  getBusById,
  bookSeats,
  getAvailableBuses,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, bookSeats);
router.post("/hold", protect, holdSeats);
router.get("/buses", protect, getAvailableBuses);
router.get("/bus/:id", protect, getBusById);
router.get("/mybookings", protect, getMyBookings);

export default router;
