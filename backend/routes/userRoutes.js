import express from "express";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser
} from "../controllers/userController.js";

import protect from "../middleware/authMiddleware.js";
import checkPermission from "../middleware/permissionMiddleware.js";

const router = express.Router();

// Protected routes
router.post("/", protect, checkPermission("create_user"), createUser);
router.get("/", protect, checkPermission("view_user"), getUsers);
router.put("/:id", protect, checkPermission("edit_user"), updateUser);
router.delete("/:id", protect, checkPermission("delete_user"), deleteUser);

export default router;