import Role from "../models/Role.js";

// ✅ Create Role
export const createRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;

    const role = await Role.create({ name, permissions });

    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get All Roles
export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Role Permissions
export const updateRole = async (req, res) => {
  try {
    const { permissions } = req.body;

    const role = await Role.findByIdAndUpdate(
      req.params.id,
      { permissions },
      { new: true }
    );

    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};