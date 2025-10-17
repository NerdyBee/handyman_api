import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Client from "../models/Client";
import Booking from "../models/Booking";
import { AuthRequest } from "../middleware/auth";
import { ClientAuthRequest } from "../middleware/clientAuth";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Helper to sign tokens
const generateToken = (id: string) =>
  jwt.sign({ id }, JWT_SECRET, { expiresIn: "7d" });

// ======================== REGISTER ========================
export const registerClient = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password, region, area, address } = req.body;

    const existing = await Client.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const client = await Client.create({
      name,
      email,
      phone,
      password: hashedPassword,
      region,
      area,
      address,
    });

    const token = generateToken(client._id.toString());

    res.status(201).json({
      message: "Registration successful",
      token,
      client: {
        id: client._id,
        name: client.name,
        email: client.email,
        phone: client.phone,
        region: client.region,
        area: client.area,
        address: client.address,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to register client", error });
  }
};

export const loginClient = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const client = await Client.findOne({ email })
      .populate("region", "name")
      .populate("area", "name");
    if (!client)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(client._id.toString());

    res.json({
      message: "Login successful",
      token,
      client: {
        id: client._id,
        name: client.name,
        email: client.email,
        phone: client.phone,
        region: client.region,
        area: client.area,
        address: client.address,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to login client", error });
  }
};

// ======================== UPDATE PROFILE ========================
export const updateClientProfile = async (req: any, res: Response) => {
  try {
    const clientId = req.client._id; // from clientProtect middleware
    const { name, email, phone, region, area, address } = req.body;

    const updatedClient = await Client.findByIdAndUpdate(
      clientId,
      { name, email, phone, region, area, address },
      { new: true }
    )
      .populate("region", "name")
      .populate("area", "name");

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json({
      message: "Profile updated successfully",
      client: {
        id: updatedClient._id,
        name: updatedClient.name,
        email: updatedClient.email,
        phone: updatedClient.phone,
        region: updatedClient.region,
        area: updatedClient.area,
        address: updatedClient.address,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update client profile" });
  }
};

// ======================== CHANGE PASSWORD ========================
export const changeClientPassword = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    const client = await Client.findById(id);
    if (!client) return res.status(404).json({ message: "Client not found" });

    const isMatch = await bcrypt.compare(oldPassword, client.password);
    if (!isMatch)
      return res.status(400).json({ message: "Old password is incorrect" });

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    client.password = hashedNewPassword;
    await client.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to change password", error });
  }
};

// export const getClientProfile = async (
//   req: ClientAuthRequest,
//   res: Response
// ) => {
//   try {
//     const client = await Client.findById(req.client._id).select("-password");
//     if (!client) return res.status(404).json({ message: "Client not found" });

//     res.json(client);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch profile", error: err });
//   }
// };
export const getClientProfile = async (
  req: ClientAuthRequest,
  res: Response
) => {
  try {
    const client = await Client.findById(req.client._id)
      .select("-password")
      .populate<{ region: { name: string } }>("region", "name")
      .populate<{ area: { name: string } }>("area", "name");

    if (!client) return res.status(404).json({ message: "Client not found" });

    res.json({
      ...client.toObject(),
      regionName:
        typeof client.region === "object" && "name" in client.region
          ? client.region.name
          : "",
      areaName:
        typeof client.area === "object" && "name" in client.area
          ? client.area.name
          : "",
    });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Failed to fetch profile", error: err });
  }
};

export const getClientProfileByToken = async (req: any, res: Response) => {
  try {
    const clientId = req.client._id; // assuming verifyToken sets req.user
    const client = await Client.findById(clientId).select("-password");
    if (!client) return res.status(404).json({ message: "Client not found" });
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile", error });
  }
};

export const getClientBookings = async (
  req: ClientAuthRequest,
  res: Response
) => {
  try {
    const clientId = req.client?._id; // ✅ use user instead of client
    if (!clientId)
      return res.status(401).json({ message: "Unauthorized: No client found" });

    const { status } = req.query; // optional query param
    const filter: any = { client: clientId };

    if (status) {
      filter.status = status; // e.g. completed, pending, cancelled
    }

    const bookings = await Booking.find(filter)
      .sort({ createdAt: -1 })
      .populate([
        { path: "service", select: "name" },
        { path: "handyman", select: "name rating" },
      ]);

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching client bookings:", error);
    res.status(500).json({ message: "Failed to fetch client bookings", error });
  }
};
