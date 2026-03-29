const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

// ✅ create app FIRST
const app = express();

// ✅ middleware
app.use(cors());
app.use(express.json());

// ✅ routes
const authRoutes = require("./routes/authRoutes");
const rideRoutes = require("./routes/rideRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/ride", rideRoutes);

// ✅ DB
connectDB();

// ✅ test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ✅ server
app.listen(5001, () => {
  console.log("Server running on port 5001");
});