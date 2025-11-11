import express from "express";
import {
  registerClient,
  loginClient,
  updateClientProfile,
  changeClientPassword,
  getClientProfile,
  getClientBookings,
  getClients,
  updateClientByAdmin,
  deleteClientByAdmin,
} from "../controllers/clientController";
import { clientProtect } from "../middleware/clientAuth"; // ✅ use this
import { protect } from "../middleware/auth";

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

// GET /api/admin/clients?page=1&limit=10
router.get("/", protect, getClients);

// PUT /api/admin/clients/:id
router.put("/:id", protect, updateClientByAdmin);

// DELETE /api/admin/clients/:id
router.delete("/:id", protect, deleteClientByAdmin);

export default router;
