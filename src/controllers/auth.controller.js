import * as AuthService from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    const newUser = await AuthService.registerUser({ name, email, password });

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
      status: true
    });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({
      message: err.message || "Server error",
      status: false
    });
  }
};

export const login = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const newUser = await AuthService.loginUser({ email, password });

    res.status(201).json({
      message: "User login successfully",
      status: true,
      data: newUser,
    });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({
      message: err.message || "Server error",
      status: false
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const newUser = await AuthService.forgotPassword({ email, password });

    res.status(201).json({
      message: "Password updated successfully",
      data: newUser,
      status: true,
    });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({
      message: err.message || "Server error",
      status: false
    });
  }
};