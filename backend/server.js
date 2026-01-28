const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB connection error:", err));

// ROUTES
const authRoutes = require("./routes/auth");
const quizRoutes = require("./routes/quizRoutes");

// Mount routes
app.use("/api/auth", authRoutes);   // ✅ Correct path for auth
app.use("/api/quizzes", quizRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
