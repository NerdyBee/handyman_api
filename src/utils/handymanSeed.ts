import mongoose from "mongoose";
import dotenv from "dotenv";
import Handyman from "../models/Handyman";

dotenv.config();

const handymen = [
  {
    name: "Samuel Adebayo",
    slug: "samuel-adebayo",
    image: "/images/worker.jpg",
    services: "Plumbing",
    specialties: [
      "Plumbing",
      "Electrical",
      "Painting",
      "Carpentry",
      "Appliance Repair",
      "General Repairs",
    ],
    rating: 4.8,
    reviewsCount: 125,
    bio: "Experienced handyman with over 5 years in the industry. Specializing in plumbing, electrical repairs, and general home maintenance. Committed to providing quality service and customer satisfaction.",
    rates: { hourly: "₦5,000", minimum: "₦10,000", travel: "₦2,000" },
    portfolio: [
      "/images/portfolio1.png",
      "/images/portfolio2.png",
      "/images/portfolio3.png",
    ],
    reviews: [
      {
        name: "Aisha Bello",
        date: "1 month ago",
        rating: 5,
        comment:
          "Samuel did an excellent job fixing my leaking faucet. He was prompt, professional, and very efficient. Highly recommend!",
      },
      {
        name: "Chukwudi Okoro",
        date: "2 months ago",
        rating: 3,
        comment:
          "Samuel was good, but there was a slight delay in his arrival. The work was satisfactory, though.",
      },
      {
        name: "Fatima Hassan",
        date: "3 months ago",
        rating: 5,
        comment:
          "Samuel is fantastic! He rewired my entire kitchen and did a superb job. Very friendly and knowledgeable.",
      },
    ],
    contact: {
      phone: "+234 803 123 4567",
      availability: "Mon - Fri: 9 AM – 6 PM",
    },
  },
  {
    name: "Mary Okonkwo",
    slug: "mary-okonkwo",
    image: "/images/worker1.jpg",
    services: "Interior Design",
    specialties: [
      "Interior Design",
      "Wall Painting",
      "Decor Installation",
      "Furniture Assembly",
    ],
    rating: 4.9,
    reviewsCount: 88,
    bio: "Creative and detail-oriented handyman with a passion for home beautification. Skilled in wall painting, décor, and furniture assembly.",
    rates: { hourly: "₦6,500", minimum: "₦13,000", travel: "₦1,500" },
    portfolio: [
      "/images/portfolio1.png",
      "/images/portfolio2.png",
      "/images/portfolio3.png",
    ],
    reviews: [
      {
        name: "Lekan Ojo",
        date: "2 weeks ago",
        rating: 5,
        comment:
          "Mary transformed my living room. Her eye for color and arrangement is impressive!",
      },
      {
        name: "Ngozi Eze",
        date: "1 month ago",
        rating: 4,
        comment:
          "Great work overall. There was a short delay, but worth the wait.",
      },
    ],
    contact: {
      phone: "+234 802 987 6543",
      availability: "Mon - Sat: 10 AM – 5 PM",
    },
  },
  {
    name: "Emeka Nwosu",
    slug: "emeka-nwosu",
    image: "/images/worker3.jpeg",
    services: "Air Conditioning & Electrical",
    specialties: [
      "AC Installation",
      "Fridge Repairs",
      "Electrical Wiring",
      "Generator Maintenance",
    ],
    rating: 4.7,
    reviewsCount: 142,
    bio: "Certified technician with over 7 years of experience in air conditioning and electrical systems. Reliable and efficient.",
    rates: { hourly: "₦7,000", minimum: "₦12,000", travel: "₦2,500" },
    portfolio: [
      "/images/portfolio1.png",
      "/images/portfolio2.png",
      "/images/portfolio3.png",
    ],
    reviews: [
      {
        name: "Tunde Salami",
        date: "3 weeks ago",
        rating: 5,
        comment:
          "Emeka fixed our office AC units fast. He clearly knows his job.",
      },
      {
        name: "Zainab Lawal",
        date: "2 months ago",
        rating: 4,
        comment: "Solid work. Would definitely call him again.",
      },
    ],
    contact: {
      phone: "+234 806 765 4321",
      availability: "Everyday: 8 AM – 6 PM",
    },
  },
  {
    name: "Phadeelah Garba",
    slug: "phadeelah-garba",
    image: "/images/female_worker.png",
    services: "Home Renovation",
    specialties: [
      "Tile Fixing",
      "POP Design",
      "Drywall Installation",
      "Ceiling Repair",
    ],
    rating: 4.6,
    reviewsCount: 96,
    bio: "Detail-focused handyman with a specialization in POP and ceiling works. Brings elegance and structure to every project.",
    rates: { hourly: "₦6,000", minimum: "₦11,000", travel: "₦2,000" },
    portfolio: [
      "/images/portfolio1.png",
      "/images/portfolio2.png",
      "/images/portfolio3.png",
    ],
    reviews: [
      {
        name: "Ibrahim Yusuf",
        date: "1 month ago",
        rating: 5,
        comment:
          "Excellent POP job in our new house. Clean and artistic finish.",
      },
      {
        name: "Ada Umeh",
        date: "3 weeks ago",
        rating: 4,
        comment: "She did great with our office tiles. Neat and fast service.",
      },
    ],
    contact: {
      phone: "+234 809 555 8899",
      availability: "Mon - Fri: 9 AM – 4 PM",
    },
  },
];

async function seedHandymen() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    await Handyman.deleteMany();
    await Handyman.insertMany(handymen);
    console.log("✅ Handymen seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding handymen:", err);
    process.exit(1);
  }
}

seedHandymen();
