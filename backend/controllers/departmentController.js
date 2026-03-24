import Department from "../models/Department.js";

// ✅ Create Department
export const createDepartment = async (req, res) => {
  try {
    const { name } = req.body;

    const department = await Department.create({ name });

    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get All Departments
export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};