import { Router } from "express";
import { body } from "express-validator";
import {
  createService,
  listServices,
  getServiceById,
  updateService,
  deleteService,
  getServiceByTitle,
  getServiceHandymen,
} from "../controllers/serviceController";
import { protect, authorizeRoles } from "../middleware/auth";

const router = Router();

// Public routes
router.get("/:title", getServiceByTitle); // 👈 use title instead of id
router.get("/", listServices);
router.get("/:id", getServiceById);

// Admin-protected routes
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  [body("title").notEmpty().withMessage("Title is required")],
  createService
);

router.put("/:id", protect, authorizeRoles("admin"), updateService);

router.delete("/:id", protect, authorizeRoles("admin"), deleteService);
router.get(
  "/:id/handymen",
  protect,
  authorizeRoles("admin"),
  getServiceHandymen
);

export default router;
