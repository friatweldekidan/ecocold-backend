const express = require("express");
const router = express.Router();
const {
  getHubs,
  getHubById,
  addHub,
  updateHub,
  deleteHub,
} = require("../controllers/hubController");

const { protect, restrictTo } = require("../middleware/authMiddleware");

// Protect all routes
router.use(protect);

// Admin can manage all hubs
router.get("/", restrictTo("admin", "hub_owner", "farmer"), getHubs);
router.get("/:id", restrictTo("admin", "hub_owner", "farmer"), getHubById);

// Admin and hub_owner can add/update/delete hubs
router.post("/", restrictTo("admin", "hub_owner"), addHub);
router.put("/:id", restrictTo("admin", "hub_owner"), updateHub);
router.delete("/:id", restrictTo("admin", "hub_owner"), deleteHub);

module.exports = router;
