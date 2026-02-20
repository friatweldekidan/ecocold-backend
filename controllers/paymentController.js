const Payment = require("../models/Payment");

// GET all payments
exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.getAllPayments();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await Payment.getPaymentById(id);
    if (!rows.length)
      return res.status(404).json({ message: "Payment not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create payment
exports.addPayment = async (req, res) => {
  try {
    const result = await Payment.createPayment(req.body);
    res.json({ message: "Payment created", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT update payment
exports.updatePayment = async (req, res) => {
  try {
    await Payment.updatePayment(req.params.id, req.body);
    res.json({ message: "Payment updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE payment
exports.deletePayment = async (req, res) => {
  try {
    await Payment.deletePayment(req.params.id);
    res.json({ message: "Payment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
