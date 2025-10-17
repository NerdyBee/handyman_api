import { Request, Response } from "express";
import RequestModel from "../models/Request";

export async function createRequest(req: any, res: Response) {
  const { service, details, price } = req.body;
  const reqDoc = new RequestModel({
    client: req.user._id,
    service,
    details,
    price,
  });
  await reqDoc.save();
  res.status(201).json(reqDoc);
}

export async function listRequests(req: any, res: Response) {
  const user = req.user;
  if (user.role === "admin") {
    const all = await RequestModel.find().populate("client handyman service");
    return res.json(all);
  }
  if (user.role === "client") {
    const mine = await RequestModel.find({ client: user._id }).populate(
      "service handyman"
    );
    return res.json(mine);
  }
  if (user.role === "handyman") {
    // handyman can see open requests and those assigned to them
    const open = await RequestModel.find({
      $or: [{ status: "open" }, { handyman: user._id }],
    }).populate("client service");
    return res.json(open);
  }
  res.json([]);
}

export async function updateRequest(req: any, res: Response) {
  const updates = req.body;
  const reqDoc = await RequestModel.findById(req.params.id);
  if (!reqDoc) return res.status(404).json({ message: "Not found" });

  // Only admin, assigned handyman or client can update depending on action — simple check
  const user = req.user;
  if (
    user.role === "client" &&
    reqDoc.client.toString() !== user._id.toString()
  )
    return res.status(403).json({ message: "Forbidden" });

  Object.assign(reqDoc, updates);
  await reqDoc.save();
  res.json(reqDoc);
}
