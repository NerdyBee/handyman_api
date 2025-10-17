import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Service from "../models/Service";

// 🔹 GET /api/services
// export const listServices = async (_req: Request, res: Response) => {
//   try {
//     const services = await Service.find();
//     res.json(services);
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err });
//   }
// };
export async function listServices(req: Request, res: Response) {
  try {
    const services = await Service.find(
      {},
      "title description price category icon"
    );
    res.json(services);
  } catch (err) {
    console.error("Error fetching services:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// @desc Get single service by title (case-insensitive)
export const getServiceByTitle = async (req: Request, res: Response) => {
  try {
    const title = decodeURIComponent(req.params.title);
    const service = await Service.findOne({
      title: { $regex: new RegExp(`^${title}$`, "i") },
    });

    if (!service) return res.status(404).json({ message: "Service not found" });

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch service", error });
  }
};

// 🔹 GET /api/services/:id
export const getServiceById = async (req: Request, res: Response) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    res.json(service);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// 🔹 POST /api/services
export const createService = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, icon, category, description, pricing, reviews, faqs } =
      req.body;

    const service = await Service.create({
      title,
      icon,
      category,
      description,
      pricing,
      reviews,
      faqs,
    });

    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: "Failed to create service", error: err });
  }
};

// 🔹 PUT /api/services/:id
export const updateService = async (req: Request, res: Response) => {
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ message: "Service not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update service", error: err });
  }
};

// 🔹 DELETE /api/services/:id
export const deleteService = async (req: Request, res: Response) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Service not found" });

    res.json({ message: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete service", error: err });
  }
};
