import mongoose from "mongoose";
import dotenv from "dotenv";
import Service from "../models/Service";
import services from "../data/serviceData";

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("🌱 Connected to MongoDB");

    await Service.deleteMany({});
    console.log("🗑️ Cleared existing services");

    const serviceList = Object.values(services);
    await Service.insertMany(serviceList);
    console.log(`✅ Inserted ${serviceList.length} services`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeder error:", error);
    process.exit(1);
  }
}

seed();
