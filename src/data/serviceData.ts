const services = {
  plumbing: {
    title: "Plumbing",
    icon: "🚿",
    category: "Home Repair",
    description:
      "Fixing a leaky faucet, installing a new toilet, or unclogging a drain.",
    pricing: "Starts at ₦5,000 depending on task complexity and parts.",
    reviews: [
      {
        name: "Aisha Bello",
        comment:
          "Quick and professional service. Fixed my leaking tap in no time!",
        rating: 5,
      },
      {
        name: "James O.",
        comment: "Reasonable pricing and friendly plumber.",
        rating: 4,
      },
    ],
    faqs: [
      {
        question: "Do I need to supply materials?",
        answer:
          "No. Our plumbers come fully equipped but may charge extra for special parts.",
      },
      {
        question: "Do you offer emergency plumbing?",
        answer: "Yes, emergency service is available at a premium rate.",
      },
    ],
  },
  electrical: {
    title: "Electrical",
    icon: "💡",
    category: "Home Repair",
    description:
      "Replacing a light fixture, repairing a faulty outlet, or installing a ceiling fan.",
    pricing:
      "Starts at ₦6,000. Extra charges may apply for materials or emergency calls.",
    reviews: [
      {
        name: "Tina A.",
        comment: "Fixed my faulty wiring. Great job!",
        rating: 5,
      },
    ],
    faqs: [
      {
        question: "Are your electricians certified?",
        answer: "Yes, all our electricians are licensed professionals.",
      },
    ],
  },

  carpentry: {
    title: "Carpentry",
    icon: "🪚",
    category: "Home Repair",
    description:
      "Build, repair, and install furniture and other wooden structures.",
    pricing: "Starts at ₦7,000 based on the type and size of the work.",
    reviews: [],
    faqs: [],
  },

  cleaning: {
    title: "Cleaning",
    icon: "🧼",
    category: "Typical Jobs",
    description:
      "Deep cleaning, regular house cleaning, and post-renovation cleanup.",
    pricing: "From ₦4,000 per room. Discounts on multiple rooms.",
    reviews: [],
    faqs: [],
  },

  mechanic: {
    title: "Mechanic",
    icon: "🧰",
    category: "Automotive",
    description:
      "Vehicle repairs, oil change, diagnostics, and routine servicing.",
    pricing: "Starts at ₦8,000. Diagnosis fee may apply.",
    reviews: [],
    faqs: [],
  },

  acRepair: {
    title: "AC Repair",
    icon: "❄️",
    category: "Appliances",
    description:
      "Servicing air conditioners, fixing cooling issues, and maintenance.",
    pricing: "From ₦6,000. Includes basic diagnostics and gas refill.",
    reviews: [],
    faqs: [],
  },

  painting: {
    title: "Painting",
    icon: "🎨",
    category: "Finishing",
    description: "Interior and exterior painting for homes and offices.",
    pricing: "Depends on area size. Starts at ₦10,000 per room.",
    reviews: [],
    faqs: [],
  },

  gardening: {
    title: "Gardening",
    icon: "🌿",
    category: "Outdoor",
    description: "Lawn mowing, plant care, and landscaping services.",
    pricing: "From ₦5,000 for small gardens.",
    reviews: [],
    faqs: [],
  },

  pestControl: {
    title: "Pest Control",
    icon: "🐜",
    category: "Home Safety",
    description: "Eradicate bugs, rodents, termites and other infestations.",
    pricing: "From ₦7,500 depending on property size.",
    reviews: [],
    faqs: [],
  },

  roofing: {
    title: "Roofing",
    icon: "🏠",
    category: "Structural",
    description: "Roof repair, leak sealing, and full roof installations.",
    pricing: "Pricing based on roof type and materials. Starts at ₦20,000.",
    reviews: [],
    faqs: [],
  },

  welding: {
    title: "Welding",
    icon: "🔥",
    category: "Metal Work",
    description: "Custom gates, window bars, and structural welding services.",
    pricing: "From ₦10,000. Project-based billing.",
    reviews: [],
    faqs: [],
  },

  tiling: {
    title: "Tiling",
    icon: "🧱",
    category: "Finishing",
    description: "Tile installation for floors, kitchens, and bathrooms.",
    pricing: "From ₦1,500 per square meter.",
    reviews: [],
    faqs: [],
  },
};

export default services;
