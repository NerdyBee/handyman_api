import { Router } from "express";
import { protect, authorizeRoles } from "../middleware/auth";
import {
  createRequest,
  listRequests,
  updateRequest,
} from "../controllers/requestController";

const router = Router();

router.post("/", protect, createRequest); // client creates request
router.get("/", protect, listRequests); // list for user (client or handyman) or admin
router.put("/:id", protect, updateRequest); // update status, assign handyman, etc.

export default router;
