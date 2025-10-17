// controllers/locationController.ts
import { Request, Response } from "express";
import Region from "../models/Region";
import Area from "../models/Area";

export const getActiveRegions = async (req: Request, res: Response) => {
  const regions = await Region.find({ status: true }).sort({ name: 1 });
  res.json(regions);
};

export const getAreasByRegion = async (req: Request, res: Response) => {
  const { regionId } = req.params;
  const areas = await Area.find({ region: regionId }).sort({ name: 1 });
  res.json(areas);
};
