import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Import route modules
import authRoutes from "./routes/auth.js";      // <-- add this
import userRoutes from "./routes/user.js";      // for interests & matching later
import roomRoutes from "./routes/room.js";



dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


// Simple test route
app.get("/", (req, res) => res.send("Backend is working ✅"));

// Mount routes
app.use("/api/auth", authRoutes);    // <-- this enables POST /api/auth/signup
app.use("/api/users", userRoutes);   // optional for later features
app.use("/api/rooms", roomRoutes);

// Start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => console.log(err));