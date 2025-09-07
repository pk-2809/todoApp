import express from "express";
import AuthRoutes from "./routes/auth.route.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, Express is working!");
});

app.use("/api/auth", AuthRoutes);

export default app;