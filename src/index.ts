import "dotenv/config";
import express from "express";
import path from "path";
import corsMiddleware from "./config/cors";
import "express-async-errors";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import serviceRoutes from "./routes/services";
import requestRoutes from "./routes/requests";
import handymanRoutes from "./routes/handyman";
import bookingRoutes from "./routes/booking";
import clientRoutes from "./routes/client";
import locationRoutes from "./routes/location";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(corsMiddleware);
app.use(express.json());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Connect DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/handymen", handymanRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/locations", locationRoutes);

// Health
app.get("/api/health", (req, res) => res.json({ ok: true }));

// Error handler (last)
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
