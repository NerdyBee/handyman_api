import { Request, Response } from "express";
import User from "../models/User";

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
