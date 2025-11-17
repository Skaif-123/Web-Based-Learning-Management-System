import dotenv from "dotenv";
import express from "express";
import { ConnectToDB } from "./database/db.js";
import { log } from "console";
import cors from "cors";
dotenv.config();
const app = express();
app.use(express.json());
ConnectToDB();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use((err, req, res, next) => {
  log(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong in server section",
  });
});
const PORT = process.env.PORT;
app.listen((req, res) => {
  console.log(`server running at PORT ${PORT}`);
});
