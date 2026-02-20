const express = require("express");
const router = express.Router();
const {
  getFarmers,
  getFarmerById,
  addFarmer,
  updateFarmer,
  deleteFarmer,
} = require("../controllers/farmerController");

const { protect, restrictTo } = require("../middleware/authMiddleware");

// Protect all routes
router.use(protect);

// Admin and hub_owner can view all farmers
router.get("/", restrictTo("admin", "hub_owner"), getFarmers);
router.get("/:id", restrictTo("admin", "hub_owner"), getFarmerById);

// Admin can add/update/delete farmers
router.post("/", restrictTo("admin"), addFarmer);
router.put("/:id", restrictTo("admin"), updateFarmer);
router.delete("/:id", restrictTo("admin"), deleteFarmer);

module.exports = router;
