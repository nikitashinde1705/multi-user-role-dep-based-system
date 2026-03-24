import express from "express";
import {
  createDepartment,
  getDepartments
} from "../controllers/departmentController.js";

import protect from "../middleware/authMiddleware.js";
import checkPermission from "../middleware/permissionMiddleware.js";

const router = express.Router();

// Protected routes
router.post("/", protect, checkPermission("create_department"), createDepartment);
router.get("/", protect, checkPermission("view_department"), getDepartments);

export default router;