import { Request, Response } from "express";
import Handyman from "../models/Handyman";
import path from "path";
import { SortOrder } from "mongoose";

// 👇 Extend Express Request to include `file`
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// const getImageUrl = (req: Request, filename?: string | null) => {
//   if (!filename) return null;
//   return `${req.protocol}://${req.get("host")}/uploads/${filename}`;
// };

// @desc Get all handymen
// export const listHandymen = async (req: Request, res: Response) => {
//   try {
//     const handymen = await Handyman.find();
//     const withImages = handymen.map((man) => ({
//       ...man.toObject(),
//       image: getImageUrl(req, man.image ?? ""),
//     }));
//     res.json(withImages);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch handymen", error });
//   }
// };

// Helper to build image URLs
const getImageUrl = (req: Request, filename?: string | null) => {
  if (!filename) return null;
  return `${req.protocol}://${req.get("host")}/uploads/${filename}`;
};

// @desc List handymen with optional service filter & sort by rating
export const listHandymen = async (req: Request, res: Response) => {
  try {
    const { service, sort } = req.query;

    // Filter by service if provided (case-insensitive)
    const filter = service
      ? { specialties: { $regex: new RegExp(service as string, "i") } }
      : {};

    // Define sort order using Mongoose's SortOrder type
    let sortObj: { [key: string]: SortOrder } = {};
    if (sort === "rating_asc") sortObj = { rating: 1 };
    else sortObj = { rating: -1 }; // default: highest rating first

    const handymen = await Handyman.find(filter).sort(sortObj);

    const withImages = handymen.map((man) => ({
      ...man.toObject(),
      image: getImageUrl(req, man.image ?? ""),
    }));

    res.json(withImages);
  } catch (error) {
    console.error("Failed to fetch handymen:", error);
    res.status(500).json({ message: "Failed to fetch handymen", error });
  }
};

// @desc Get handyman by slug
export const getHandymanBySlug = async (req: Request, res: Response) => {
  try {
    const handyman = await Handyman.findOne({ slug: req.params.slug });
    if (!handyman)
      return res.status(404).json({ message: "Handyman not found" });

    res.json({
      ...handyman.toObject(),
      image: getImageUrl(req, handyman.image ?? ""),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch handyman", error });
  }
};

// @desc Get top-rated handymen
export const getTopRatedHandymen = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 5;
    const handymen = await Handyman.find().sort({ rating: -1 }).limit(limit);

    const withImages = handymen.map((man) => ({
      ...man.toObject(),
      image: getImageUrl(req, man.image ?? ""),
    }));

    res.json(withImages);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch top-rated handymen", error });
  }
};

// @desc Get top-rated by service
export const getTopRatedByService = async (req: Request, res: Response) => {
  try {
    const { service } = req.query;
    const filter = service
      ? { specialties: { $regex: new RegExp(service as string, "i") } }
      : {};

    const handymen = await Handyman.find(filter).sort({ rating: -1 }).limit(10);
    const withImages = handymen.map((man) => ({
      ...man.toObject(),
      image: getImageUrl(req, man.image ?? ""),
    }));

    res.json(withImages);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch top-rated by service", error });
  }
};

// @desc Create handyman
export const createHandyman = async (req: Request, res: Response) => {
  try {
    const { name, phone, email, specialties, rating } = req.body;
    const image = req.file ? req.file.filename : null;

    const handyman = await Handyman.create({
      name,
      phone,
      email,
      specialties,
      rating,
      image,
    });

    res.status(201).json({
      ...handyman.toObject(),
      image: getImageUrl(req, handyman.image ?? ""),
    });
  } catch (error) {
    res.status(400).json({ message: "Failed to create handyman", error });
  }
};

// @desc Update handyman
export const updateHandyman = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    if (req.file) data.image = req.file.filename;

    const handyman = await Handyman.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    if (!handyman)
      return res.status(404).json({ message: "Handyman not found" });

    res.json({
      ...handyman.toObject(),
      image: getImageUrl(req, handyman.image ?? ""),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update handyman", error });
  }
};

// @desc Delete handyman
export const deleteHandyman = async (req: Request, res: Response) => {
  try {
    const handyman = await Handyman.findByIdAndDelete(req.params.id);
    if (!handyman)
      return res.status(404).json({ message: "Handyman not found" });

    res.json({ message: "Handyman deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete handyman", error });
  }
};
