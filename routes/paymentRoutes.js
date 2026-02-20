const express = require("express");
const router = express.Router();
const {
  getPayments,
  getPaymentById,
  addPayment,
  updatePayment,
  deletePayment,
} = require("../controllers/paymentController");

const { protect, restrictTo } = require("../middleware/authMiddleware");

// Protect all routes
router.use(protect);

// Admin and hub_owner can view payments
router.get("/", restrictTo("admin", "hub_owner"), getPayments);
router.get("/:id", restrictTo("admin", "hub_owner"), getPaymentById);

// Admin can add/update/delete payments
router.post("/", restrictTo("admin"), addPayment);
router.put("/:id", restrictTo("admin"), updatePayment);
router.delete("/:id", restrictTo("admin"), deletePayment);

module.exports = router;
