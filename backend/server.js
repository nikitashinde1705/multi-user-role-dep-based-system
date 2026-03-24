import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import protect from "./middleware/authMiddleware.js";
import checkPermission from "./middleware/permissionMiddleware.js";

import roleRoutes from "./routes/roleRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import "./models/Role.js";
import "./models/User.js";
import "./models/Department.js";


dotenv.config();

const app = express();


// Middleware
app.use(express.json());
app.use(cors({
  //origin: "http://localhost:5173"
  origin: "https://rolebase-acces.netlify.app",
  credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/users", userRoutes);

// DB connection
connectDB();

// Test route

app.get(
  "/api/test",
  protect,
  checkPermission("view_user"),
  (req, res) => {
    res.json({ message: "Access granted" });
  }
);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));