import User from "../models/User.js";
import bcrypt from "bcryptjs";

// ✅ Create User (Admin only)
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      department
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get All Users (with role + department)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password") // ✅ hide password
      .populate("role", "name permissions")
      .populate("department", "name");

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update User Role / Department
export const updateUser = async (req, res) => {
  try {
    const { role, department } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role, department },
      { new: true }
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete User
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};