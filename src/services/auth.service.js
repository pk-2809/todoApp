import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const registerUser = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    throw error;
  }

  const checkIfExist = await User.findOne({ email });
  if (checkIfExist) {
    const error = new Error("User already exists");
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();
  return newUser;
};