const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const { protect, restrictTo } = require("../middleware/authMiddleware");

// Protect all routes
router.use(protect);

// Only admin can manage users
router.get("/", restrictTo("admin"), getUsers);
router.get("/:id", restrictTo("admin"), getUserById);
router.post("/", restrictTo("admin"), addUser);
router.put("/:id", restrictTo("admin"), updateUser);
router.delete("/:id", restrictTo("admin"), deleteUser);

module.exports = router;
