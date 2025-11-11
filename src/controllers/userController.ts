import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";

export async function getMe(req: any, res: Response) {
  const user = await User.findById(req.user._id).select("-password");
  res.json(user);
}

export async function updateMe(req: any, res: Response) {
  const updates = (({ name, phone }) => ({ name, phone }))(req.body);
  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
  }).select("-password");
  res.json(user);
}

export async function getUsers(req: any, res: Response) {
  const users = await User.find().select("-password");
  res.json(users);
}
// export async function getUsers(req: Request, res: Response) {
//   try {
//     const page = parseInt(req.query.page as string) || 1;
//     const limit = parseInt(req.query.limit as string) || 10;
//     const skip = (page - 1) * limit;

//     const total = await User.countDocuments();
//     const users = await User.find()
//       .select("-password")
//       .skip(skip)
//       .limit(limit)
//       .sort({ createdAt: -1 });

//     res.json({
//       users,
//       page,
//       totalPages: Math.ceil(total / limit),
//       total,
//     });
//   } catch (err) {
//     console.error("Error fetching users:", err);
//     res.status(500).json({ message: "Failed to fetch users" });
//   }
// }

export async function createUser(req: any, res: Response) {
  try {
    const { name, email, password, role, phone } = req.body;

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
      phone,
      status: "Active", // default
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to create user", error: err });
  }
}

export async function updateUser(req: any, res: Response) {
  try {
    const { id } = req.params;
    const updates = (({ name, email, phone, role }) => ({
      name,
      email,
      phone,
      role,
    }))(req.body);

    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
    }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}

export async function deleteUser(req: any, res: Response) {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}
