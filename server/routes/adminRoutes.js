import express from "express";
import {
  createBus,
  getBuses,
  getBusById,
} from "../controllers/adminController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/bus")
  .post(protect, admin, createBus)
  .get(protect, admin, getBuses);
router.get("/bus/:id", protect, admin, getBusById);

export default router;
