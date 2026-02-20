const express = require("express");
const router = express.Router();
const controller = require("../controllers/simulation.controller");
const { protect, restrictTo } = require("../middleware/authMiddleware");

// Only authenticated hub owners can run simulations
router.post("/", protect, restrictTo("hub_owner"), controller.simulate);

module.exports = router;
