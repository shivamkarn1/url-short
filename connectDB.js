import mongoose from "mongoose";
import { DB_NAME } from "./constants/file.js";
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log("MongoDB connection SUCCESS !! ");
  } catch (error) {
    console.log("Error COnnecting to DB !! ", error);
    process.exit(1);
  }
};

export { connectDB };
