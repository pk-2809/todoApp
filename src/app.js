import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectDB } from "./lib/db.js";
import AuthRoutes from "./routes/auth.route.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, Express is working!");
});

app.use("/api/auth", AuthRoutes);


const PORT = process.env.PORT || 5100;

app.listen(PORT, async () => {
    console.log('server is running at port', PORT);
    connectDB();
})