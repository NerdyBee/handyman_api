import { Request, Response } from "express";
import Handyman from "../models/Handyman";
import fs from "fs";
import path from "path";
import mongoose, { SortOrder } from "mongoose";

// // 👇 Extend Express Request to include `file`
// interface MulterRequest extends Request {
//   file?: Express.Multer.File;
// }

// Helper: Generate absolute image URL
const getImageUrl = (req: Request, filename?: string | null) => {
  if (!filename) return null;
  return `${req.protocol}://${req.get("host")}/uploads/${filename}`;
};

// Helper: delete old image from uploads folder
const deleteImage = (filename?: string | null) => {
  if (!filename) return;
  const filePath = path.join(process.cwd(), "uploads", filename);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
};

// @desc List handymen with optional service filter & sort by rating
// ✅ List Handymen with pagination, filters & search
export const listHandymen = async (req: Request, res: Response) => {
  try {
    const { service, sort, page = 1, limit = 10, search = "" } = req.query;

    const filter: any = {};
    if (service) filter.services = service;
    if (search)
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { bio: { $regex: search, $options: "i" } },
      ];

    const sortObj: Record<string, SortOrder> =
      sort === "rating_asc" ? { rating: 1 } : { rating: -1 };

    const total = await Handyman.countDocuments(filter);

    const handymen = await Handyman.find(filter)
      .populate("services", "title")
      .sort(sortObj)
      .skip((+page - 1) * +limit)
      .limit(+limit);

    const withImages = handymen.map((h) => ({
      ...h.toObject(),
      image: getImageUrl(req, h.image ?? ""),
    }));

    res.json({
      total,
      page: +page,
      limit: +limit,
      data: withImages,
    });
  } catch (error) {
    console.error("Failed to fetch handymen:", error);
    res.status(500).json({ message: "Failed to fetch handymen", error });
  }
};

// ✅ Get handyman by slug
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

// ✅ Create handyman
export const createHandyman = async (req: Request, res: Response) => {
  try {
    // 🧩 Handle form-data
    const {
      name,
      slug,
      bio,
      rating,
      reviewsCount,
      specialties,
      services,
      contact,
      rates,
    } = req.body;

    const image = req.file ? req.file.filename : null;

    // Convert fields that may come as strings from FormData
    const handymanData: any = {
      name,
      slug,
      bio,
      image,
      rating: rating ? Number(rating) : 0,
      reviewsCount: reviewsCount ? Number(reviewsCount) : 0,
      specialties: specialties
        ? typeof specialties === "string"
          ? specialties.split(",").map((s) => s.trim())
          : specialties
        : [],
      services: services
        ? typeof services === "string"
          ? services.split(",").map((id) => new mongoose.Types.ObjectId(id))
          : services
        : [],
      contact: contact ? JSON.parse(contact) : {},
      rates: rates ? JSON.parse(rates) : {},
    };

    const handyman = await Handyman.create(handymanData);

    res.status(201).json({
      message: "Handyman created successfully",
      data: {
        ...handyman.toObject(),
        image: getImageUrl(req, handyman.image ?? ""),
      },
    });
  } catch (error) {
    console.error("Create handyman failed:", error);
    res.status(400).json({
      message: "Failed to create handyman",
      error: (error as any).message,
    });
  }
};

// ✅ Update handyman
export const updateHandyman = async (req: Request, res: Response) => {
  try {
    const handyman = await Handyman.findById(req.params.id);
    if (!handyman)
      return res.status(404).json({ message: "Handyman not found" });

    const {
      name,
      slug,
      bio,
      rating,
      reviewsCount,
      specialties,
      services,
      contact,
      rates,
    } = req.body;

    if (req.file) {
      // Delete old image
      deleteImage(handyman.image);
      handyman.image = req.file.filename;
    }

    handyman.name = name ?? handyman.name;
    handyman.slug = slug ?? handyman.slug;
    handyman.bio = bio ?? handyman.bio;
    handyman.rating = rating ? Number(rating) : handyman.rating;
    handyman.reviewsCount = reviewsCount
      ? Number(reviewsCount)
      : handyman.reviewsCount;

    if (specialties)
      handyman.specialties =
        typeof specialties === "string"
          ? specialties.split(",").map((s) => s.trim())
          : specialties;

    if (services)
      handyman.services =
        typeof services === "string"
          ? services.split(",").map((id) => new mongoose.Types.ObjectId(id))
          : services;

    if (contact) handyman.contact = JSON.parse(contact);
    if (rates) handyman.rates = JSON.parse(rates);

    const updated = await handyman.save();

    res.json({
      message: "Handyman updated successfully",
      data: {
        ...updated.toObject(),
        image: getImageUrl(req, updated.image ?? ""),
      },
    });
  } catch (error) {
    console.error("Update handyman failed:", error);
    res.status(500).json({
      message: "Failed to update handyman",
      error: (error as any).message,
    });
  }
};

// ✅ Delete handyman
export const deleteHandyman = async (req: Request, res: Response) => {
  try {
    const handyman = await Handyman.findByIdAndDelete(req.params.id);
    if (!handyman)
      return res.status(404).json({ message: "Handyman not found" });

    deleteImage(handyman.image);
    res.json({ message: "Handyman deleted successfully" });
  } catch (error) {
    console.error("Delete handyman failed:", error);
    res.status(500).json({ message: "Failed to delete handyman", error });
  }
};

// ✅ Get handymen by service
export const getHandymenByService = async (req: Request, res: Response) => {
  try {
    const { serviceId } = req.params;
    if (!serviceId)
      return res.status(400).json({ message: "Service ID is required" });

    const handymen = await Handyman.find({ services: serviceId })
      .populate("services", "title")
      .sort({ rating: -1 });

    const withImages = handymen.map((h) => ({
      ...h.toObject(),
      image: getImageUrl(req, h.image ?? ""),
    }));

    res.json(withImages);
  } catch (error) {
    console.error("Failed to fetch by service:", error);
    res.status(500).json({ message: "Failed to fetch by service", error });
  }
};
