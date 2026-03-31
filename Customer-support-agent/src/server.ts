import cors from "cors";
import express, { Express } from "express";
import { askStructured } from "./ask-core";
import { loadEnv } from "./env";

loadEnv();
const app: Express = express();
app.use(
  cors({
    origin: ["http://localhost:3000","http://localhost:5173"], // allowed origins
    methods: ["GET", "POST", "PUT", "DELETE"], // allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // allowed headers
    credentials: false, // allow cookies/auth headers
  }),
);

app.use(express.json());

// defining route and controller
app.post("/ask", async (req, res) => {
  try {
    const { query } = req.body ?? {};
    if (!query || !String(query.trim())) {
      return res.status(400).json({ error: "Field is empty,pls give query" });
    }
    const output = await askStructured(query);
    res.status(200).json(output);
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" });
  }
});
const PORT=process.env.PORT
// defining listening
app.listen(PORT, () => {
  console.log(`app is listening at ${PORT}`);
});
