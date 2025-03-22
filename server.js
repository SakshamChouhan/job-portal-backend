const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const resumeRoutes = require("./routes/resume");
const jobRoutes = require("./routes/jobs");
const skillsRoutes = require("./routes/skills"); 
const authMiddleware = require("./middleware/authMiddleware");
const profileRoutes = require("./routes/profile"); // Import profile routes
require("dotenv").config();

const app = express();

// ✅ Allow CORS
app.use(cors());
app.use(express.json());

connectDB();

// Use the routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/resume", authMiddleware, resumeRoutes); // Resume routes with authentication
app.use("/api/jobs", authMiddleware, jobRoutes); // Job-related routes with authentication
app.use("/api/skills", authMiddleware, skillsRoutes); // Skills-related routes with authentication
app.use("/api/profile", authMiddleware, profileRoutes); // Profile-related route

// Server running
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
