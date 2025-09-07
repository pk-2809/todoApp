import express from "express";
import { register, login, forgotPassword } from "../controllers/auth.controller.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/forgot-password", forgotPassword);

export default authRoutes;
