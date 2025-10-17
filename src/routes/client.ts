import express from "express";
import {
  registerClient,
  loginClient,
  updateClientProfile,
  changeClientPassword,
  getClientProfile,
  getClientBookings,
} from "../controllers/clientController";
import { clientProtect } from "../middleware/clientAuth"; // ✅ use this

const router = express.Router();

// Auth
router.post("/register", registerClient);
router.post("/login", loginClient);

// Secure profile route
router.get("/profile", clientProtect, getClientProfile);
// router.put("/profile", clientProtect, updateClientProfile);
// in routes/clientRoutes.js
router.put("/update", clientProtect, updateClientProfile);

router.get("/bookings", clientProtect, getClientBookings); // ✅ new route

router.put("/:id", updateClientProfile);
router.put("/:id/password", changeClientPassword);

export default router;
