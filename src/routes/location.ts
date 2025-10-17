// routes/locationRoutes.ts
import express from "express";
import {
  getActiveRegions,
  getAreasByRegion,
} from "../controllers/locationController";

const router = express.Router();
router.get("/regions", getActiveRegions);
router.get("/regions/:regionId/areas", getAreasByRegion);

export default router;
