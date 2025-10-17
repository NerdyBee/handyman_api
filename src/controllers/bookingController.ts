// File: src/controllers/bookingController.ts
import { Request, Response } from "express";
import Booking from "../models/Booking";
import Client from "../models/Client";
import { ClientAuthRequest } from "../middleware/clientAuth";

// Create a new booking
// export const createBooking = async (req: Request, res: Response) => {
//   try {
//     const { service, address, phone, date, time, client, handyman } = req.body;

//     const booking = await Booking.create({
//       service,
//       address,
//       phone,
//       date,
//       time,
//       client: client || null,
//       handyman: handyman || null,
//       status: "pending", // default
//     });

//     // Populate handyman and client info if available
//     await booking.populate([
//       { path: "client", select: "name email" },
//       { path: "handyman", select: "name rating" },
//     ]);

//     res.status(201).json(booking);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to create booking", error });
//   }
// };

export const createBooking = async (req: ClientAuthRequest, res: Response) => {
  try {
    const { service, address, phone, date, time, handyman } = req.body;

    const booking = await Booking.create({
      service,
      address,
      phone,
      date,
      time,
      handyman: handyman || null,
      client: req.client ? req.client._id : null, // ✅ use logged-in client if available
      status: "pending",
    });

    await booking.populate([
      { path: "client", select: "name email" },
      { path: "handyman", select: "name rating" },
    ]);

    res.status(201).json(booking);
  } catch (error) {
    console.error("Booking creation failed:", error);
    res.status(500).json({ message: "Failed to create booking", error });
  }
};

// Get all bookings (admin)
export const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .populate([
        { path: "client", select: "name email" },
        { path: "handyman", select: "name rating" },
      ]);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings", error });
  }
};

// Get single booking by ID
export const getBookingById = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id).populate([
      { path: "client", select: "name email" },
      { path: "handyman", select: "name rating" },
    ]);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch booking", error });
  }
};

// Get all bookings for a specific client
export const getClientBookings = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params;

    const bookings = await Booking.find({ client: clientId })
      .sort({ createdAt: -1 })
      .populate([
        { path: "handyman", select: "name rating" },
        { path: "client", select: "name email" },
      ]);

    if (!bookings.length) {
      return res
        .status(404)
        .json({ message: "No bookings found for this client" });
    }

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching client bookings:", error);
    res.status(500).json({ message: "Failed to fetch client bookings", error });
  }
};

// Update booking (assign handyman or change status)
export const updateBooking = async (req: Request, res: Response) => {
  try {
    const { handyman, status } = req.body;
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (handyman) booking.handyman = handyman;
    if (status) booking.status = status;

    await booking.save();
    await booking.populate([
      { path: "client", select: "name email" },
      { path: "handyman", select: "name rating" },
    ]);

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Failed to update booking", error });
  }
};
