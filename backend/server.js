import dotenv from "dotenv";
dotenv.config();

import dns from "node:dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./route/auth.routes.js";
import reviewRoutes from "./route/review.route.js";
import suggestRoutes from "./route/suggest.route.js";

const app = express();

 
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
  process.env.FRONTEND_URL 
];


app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true
}));

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/suggest", suggestRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ✅ DB + Server start
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });