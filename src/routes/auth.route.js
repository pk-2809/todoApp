import express from "express";
import User from "../models/User.js";

const AuthRoutes = express.Router();

AuthRoutes.post("/register", async(req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(req.body);
        if(!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const checkIfExist = await User.findOne({ email });
        if (checkIfExist) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

export default AuthRoutes;