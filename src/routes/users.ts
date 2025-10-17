import { Router } from "express";
import { protect, authorizeRoles } from "../middleware/auth";
import { getMe, updateMe, getUsers } from "../controllers/userController";

const router = Router();

router.get("/me", protect, getMe);
router.put("/me", protect, updateMe);
router.get("/", protect, authorizeRoles("admin"), getUsers);

export default router;
