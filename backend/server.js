import dotenv from "dotenv";
import express from "express";
import { ConnectToDB } from "./database/db.js";
import { log } from "console";
import cors from "cors";
import authRoutes from "./routes/auth-routes/index.js";

dotenv.config();
const app = express();
app.use(express.json());
ConnectToDB();
app.use(
  cors({
      origin: [
      process.env.FRONTEND_URL,
      "https://*.github.dev",
      "https://*.app.github.dev",
      "http://localhost:3000"
    ],
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/auth", authRoutes);

app.use((err, req, res, next) => {
  log(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong in server section",
  });
});
const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at PORT ${PORT}`);
});

