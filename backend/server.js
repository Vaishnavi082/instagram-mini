import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import followRoutes from "./routes/follow.js";
import postRoutes from "./routes/post.js";

dotenv.config();

const app = express();
app.use(cors());
// connecting to database
connectDB();

// middlewares

app.use(express.json());

// routes
app.use("/", authRoutes);
app.use("/", followRoutes);
app.use("/", postRoutes);

// start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
