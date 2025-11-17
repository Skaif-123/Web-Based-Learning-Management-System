import { log } from "console";
import mongoose from "mongoose";

const ConnectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    log("Some error in database connection");
  }
};

export { ConnectToDB };
