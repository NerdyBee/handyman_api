import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Client from "../models/Client";

export interface ClientAuthRequest extends Request {
  //   user?: any;
  client?: any;
}

export async function clientProtect(
  req: ClientAuthRequest,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer "))
    return res.status(401).json({ message: "Not authorized, no token" });

  const token = header.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    const client = await Client.findById(payload.id).select("-password");
    if (!client) return res.status(401).json({ message: "Client not found" });

    req.client = client;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token", error });
  }
}
