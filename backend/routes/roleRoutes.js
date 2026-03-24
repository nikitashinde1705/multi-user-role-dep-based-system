import express from "express";
import {
  createRole,
  getRoles,
  updateRole
} from "../controllers/roleController.js";

import protect from "../middleware/authMiddleware.js";
import checkPermission from "../middleware/permissionMiddleware.js";

const router = express.Router();

// Only admin-type permissions allowed
router.post("/", protect, checkPermission("create_role"), createRole);
router.get("/", protect, checkPermission("view_role"), getRoles);
router.put("/:id", protect, checkPermission("edit_role"), updateRole);

export default router;