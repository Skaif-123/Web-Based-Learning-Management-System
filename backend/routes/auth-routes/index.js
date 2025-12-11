import express from "express";
import {registerUser} from "../../controllers/auth-controller/index.js";

const router = express.Router();
router.post("/register", registerUser);

export default router