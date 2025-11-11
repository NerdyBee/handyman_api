import { Router } from "express";
import { protect, authorizeRoles } from "../middleware/auth";
import {
  getMe,
  updateMe,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";

const router = Router();

router.get("/me", protect, getMe);
router.put("/me", protect, updateMe);
// router.get("/", protect, authorizeRoles("admin"), getUsers);
router.get("/", protect, authorizeRoles("admin"), getUsers); // <-- paginated
router.post("/", protect, authorizeRoles("admin"), createUser);
router.put("/:id", protect, authorizeRoles("admin"), updateUser);
router.delete("/:id", protect, authorizeRoles("admin"), deleteUser);

export default router;
