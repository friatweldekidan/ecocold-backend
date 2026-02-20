const express = require("express");
const router = express.Router();
const {
  getBookings,
  getBookingById,
  addBooking,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookingController");

const { protect, restrictTo } = require("../middleware/authMiddleware");

// Protect all routes
router.use(protect);

// Admin and hub_owner can view all bookings
router.get("/", restrictTo("admin", "hub_owner"), getBookings);
router.get("/:id", restrictTo("admin", "hub_owner", "farmer"), getBookingById);

// Admin and farmers can add bookings
router.post("/", restrictTo("admin", "farmer"), addBooking);

// Admin, hub_owner, and farmer can update booking
router.put("/:id", restrictTo("admin", "hub_owner", "farmer"), updateBooking);

// Admin can delete booking
router.delete("/:id", restrictTo("admin"), deleteBooking);

module.exports = router;
