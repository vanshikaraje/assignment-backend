// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";

// import formRoutes from "./routes/formRoutes.js";
// import responseRoutes from "./routes/responseRoutes.js";
// import uploadRoutes from "./routes/uploadRoutes.js";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json({ limit: "8mb" }));

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.get("/", (req, res) => {
//   res.send("Backend server is running 🚀");
// });

// app.use("/api/forms", formRoutes);
// app.use("/api/responses", responseRoutes);
// app.use("/api/upload", uploadRoutes);

// const PORT = process.env.PORT || 5000;
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB Connected");
//     app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err.message);
//   });
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import formRoutes from "./routes/formRoutes.js";
import responseRoutes from "./routes/responseRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "8mb" }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Backend server is running 🚀");
});

app.use("/api/forms", formRoutes);
app.use("/api/responses", responseRoutes);
app.use("/api/upload", uploadRoutes);

// MongoDB connection caching to prevent multiple connections on serverless invocations
let isConnected;

async function connectToDatabase() {
  if (isConnected) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
}

// Vercel serverless handler
export default async function handler(req, res) {
  await connectToDatabase();
  app(req, res);
}
