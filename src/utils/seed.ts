import "dotenv/config";
import { connectDB } from "../config/db";
import User from "../models/User";
import Service from "../models/Service";
import bcrypt from "bcryptjs";

async function seed() {
  await connectDB();
  const exists = await User.findOne({ email: "admin@handyman.local" });
  if (!exists) {
    const hashed = await bcrypt.hash("password123", 10);
    await User.create({
      name: "Admin",
      email: "admin@handyman.local",
      password: hashed,
      role: "admin",
    });
    console.log("Created admin user: admin@handyman.local / password123");
  }
  const count = await Service.countDocuments();
  if (count === 0) {
    await Service.insertMany([
      { title: "Plumbing", description: "Fix leaks, pipes, taps", price: 0 },
      { title: "Electrical", description: "Wiring, lights, sockets", price: 0 },
      {
        title: "Carpentry",
        description: "Cabinets, doors, furniture",
        price: 0,
      },
    ]);
    console.log("Seeded services");
  }
  process.exit(0);
}

seed().catch((err) => console.error(err));
