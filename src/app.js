import express from "express";
import AuthRoutes from "./routes/auth.route.js";
import cors from "cors";
const app = express();

app.use(cors({
  origin: "localhost:1234",
  credentials: true
}))

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, Express is working!");
});

app.use("/api/auth", AuthRoutes);

export default app;