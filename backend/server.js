import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { ConnectToDB } from "./database/db.js";
import authRoutes from "./routes/auth-routes/index.js";
import mediaRoutes from "./routes/instructor-routes/mediaRoutes.js";
import instructorCourseRoutes from "./routes/instructor-routes/course-routes.js";

dotenv.config();
const app = express();
app.use(express.json());
ConnectToDB();


app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend origin
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
   allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
   credentials: true // If you need to send cookies/authentication headers
}))


app.use("/auth", authRoutes);
app.use("/media",mediaRoutes);
app.use("/instructor/course",instructorCourseRoutes);

app.use((err, req, res, next) => {
  
  res.status(500).json({
    success: false,
    message: "Something went wrong in server section",
  });
});
const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at PORT ${PORT}`);
});


