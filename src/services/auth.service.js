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

export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    throw error;
  }
  
  const userData = await User.findOne({ email });
  if (!userData) {
    const error = new Error("User doesn't exists");
    error.statusCode = 400;
    throw error;
  }

  const isPassMatch = await bcrypt.compare(password, userData.password);
  if(!isPassMatch) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }
    
  const { password: _, ...userDetails } = userData.toObject();
  return { ...userDetails };
};

export const forgotPassword = async ({ email, password }) => {
  if (!email || !password) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    throw error;
  }

  const userData = await User.findOne({ email });
  if (!userData) {
    const error = new Error("User doesn't exists");
    error.statusCode = 400;
    throw error;
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  userData.password = hashedPassword;
  await userData.save();

  const { password: _, ...userDetails } = userData.toObject();
  
  return { ...userDetails };
};