import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: process.env.PORT || 5001,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/mydb",
};