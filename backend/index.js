const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// DB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

// ROUTES (THIS IS WHAT YOU WERE MISSING)
const authRoutes = require("./routes/auth");
const quizRoutes = require("./routes/quizRoutes");

app.use("/api/users", authRoutes);
app.use("/api/quizzes", quizRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
