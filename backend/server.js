import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./route/auth.routes.js";
import reviewRoutes from "./route/review.route.js";
import suggestRoutes from "./route/suggest.route.js";

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use("/api/auth", authRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/suggest", suggestRoutes);

mongoose.connect(process.env.DB_URL);
