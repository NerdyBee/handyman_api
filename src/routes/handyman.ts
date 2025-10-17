import express from "express";
import {
  listHandymen,
  getHandymanBySlug,
  createHandyman,
  updateHandyman,
  deleteHandyman,
  getTopRatedHandymen,
  getTopRatedByService,
} from "../controllers/handymanController";
import { protect, authorizeRoles } from "../middleware/auth";
import { upload } from "../config/upload";

const router = express.Router();

// Public routes
router.get("/top-rated", getTopRatedHandymen); // 👈 must come before "/:slug"
router.get("/top-rated-by-service", getTopRatedByService);
router.get("/", listHandymen);
router.get("/:slug", getHandymanBySlug);

// Admin routes
router.post("/", protect, authorizeRoles("admin"), createHandyman);
router.put("/:id", protect, authorizeRoles("admin"), updateHandyman);
router.delete("/:id", protect, authorizeRoles("admin"), deleteHandyman);

export default router;
