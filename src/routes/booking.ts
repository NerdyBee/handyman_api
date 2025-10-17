import express from "express";
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  getClientBookings, // 👈 new
} from "../controllers/bookingController";
import { clientProtect } from "../middleware/clientAuth";

const router = express.Router();

// router.post("/", createBooking); // Create booking
router.post("/", clientProtect, createBooking);
router.get("/", getBookings); // Get all bookings
router.get("/client/:clientId", getClientBookings); // 👈 Client bookings
router.get("/:id", getBookingById); // Get single booking
router.patch("/:id", updateBooking); // Update booking (handyman/status)

export default router;
