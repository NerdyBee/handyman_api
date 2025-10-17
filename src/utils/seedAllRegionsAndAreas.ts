import mongoose from "mongoose";
import dotenv from "dotenv";
import Region from "../models/Region"; // ✅ adjust path based on your project structure
import Area from "../models/Area";

dotenv.config();

async function seedRegionsAndAreas() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ Connected to MongoDB");

    // Clear existing
    await Region.deleteMany();
    await Area.deleteMany();

    // All states + FCT
    const allRegions = [
      "Abia",
      "Adamawa",
      "Akwa Ibom",
      "Anambra",
      "Bauchi",
      "Bayelsa",
      "Benue",
      "Borno",
      "Cross River",
      "Delta",
      "Ebonyi",
      "Edo",
      "Ekiti",
      "Enugu",
      "FCT (Abuja)",
      "Gombe",
      "Imo",
      "Jigawa",
      "Kaduna",
      "Kano",
      "Katsina",
      "Kebbi",
      "Kogi",
      "Kwara",
      "Lagos",
      "Nasarawa",
      "Niger",
      "Ogun",
      "Ondo",
      "Osun",
      "Oyo",
      "Plateau",
      "Rivers",
      "Sokoto",
      "Taraba",
      "Yobe",
      "Zamfara",
    ];

    // Insert all regions (only FCT & Lagos active)
    const regions = await Region.insertMany(
      allRegions.map((name) => ({
        name,
        status: name === "Lagos" || name === "FCT (Abuja)",
      }))
    );

    // Create a quick lookup map
    const regionMap = regions.reduce((acc, region) => {
      acc[region.name] = region._id;
      return acc;
    }, {} as Record<string, mongoose.Types.ObjectId>);

    // Areas for Lagos & FCT
    const areaDocs = [
      // FCT
      { name: "Abuja Airport Road - Chika", region: regionMap["FCT (Abuja)"] },
      {
        name: "Abuja Airport Road - Gosa / Sabon Lugbe",
        region: regionMap["FCT (Abuja)"],
      },
      {
        name: "Abuja Airport Road - Nnamdi Azikiwe Airport",
        region: regionMap["FCT (Abuja)"],
      },
      { name: "Abuja Airport Road - Piwoi", region: regionMap["FCT (Abuja)"] },
      {
        name: "Abuja Airport Road - Pyakasa",
        region: regionMap["FCT (Abuja)"],
      },
      {
        name: "Abuja Airport Road - Riverpark / Trademore",
        region: regionMap["FCT (Abuja)"],
      },
      {
        name: "Abuja Airport Road - Sauka / Immigration HQ",
        region: regionMap["FCT (Abuja)"],
      },
      { name: "Abuja - APO Central", region: regionMap["FCT (Abuja)"] },
      { name: "Abuja - Garki Area 1", region: regionMap["FCT (Abuja)"] },
      { name: "Abuja - Garki Area 2", region: regionMap["FCT (Abuja)"] },
      { name: "Abuja - Garki Area 10", region: regionMap["FCT (Abuja)"] },
      { name: "Abuja - Garki Area 11", region: regionMap["FCT (Abuja)"] },
      { name: "Abuja - Gwarinpa 1st Avenue", region: regionMap["FCT (Abuja)"] },
      { name: "Abuja - Maitama", region: regionMap["FCT (Abuja)"] },
      { name: "Abuja - Wuse 2", region: regionMap["FCT (Abuja)"] },
      { name: "Abuja - Jabi", region: regionMap["FCT (Abuja)"] },
      { name: "Abuja - Lokogoma", region: regionMap["FCT (Abuja)"] },
      { name: "Abuja - Kubwa", region: regionMap["FCT (Abuja)"] },

      // Lagos
      { name: "Lagos - Ikeja", region: regionMap["Lagos"] },
      { name: "Lagos - Lekki Phase 1", region: regionMap["Lagos"] },
      { name: "Lagos - Victoria Island", region: regionMap["Lagos"] },
      { name: "Lagos - Yaba", region: regionMap["Lagos"] },
      { name: "Lagos - Surulere", region: regionMap["Lagos"] },
      { name: "Lagos - Ajah", region: regionMap["Lagos"] },
      { name: "Lagos - Maryland", region: regionMap["Lagos"] },
      { name: "Lagos - Ikorodu", region: regionMap["Lagos"] },
      { name: "Lagos - Isolo", region: regionMap["Lagos"] },
      { name: "Lagos - Magodo", region: regionMap["Lagos"] },
    ];

    await Area.insertMany(areaDocs);

    console.log("✅ Regions and Areas seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding regions and areas:", error);
    process.exit(1);
  }
}

seedRegionsAndAreas();
