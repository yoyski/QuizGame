import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import quizRoutes from "./routes/quizRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use("/auth", authRoutes);
app.use("/quiz", quizRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Mongodb connected");
    app.listen(PORT, () => {
      console.log("🚀 Server is running on port " + PORT);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });