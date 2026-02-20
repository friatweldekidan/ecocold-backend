const Booking = require("../models/Booking");

// GET all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.getAllBookings();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await Booking.getBookingById(id);
    if (!rows.length)
      return res.status(404).json({ message: "Booking not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create booking
exports.addBooking = async (req, res) => {
  try {
    const result = await Booking.createBooking(req.body);
    res.json({ message: "Booking created", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT update booking
exports.updateBooking = async (req, res) => {
  try {
    await Booking.updateBooking(req.params.id, req.body);
    res.json({ message: "Booking updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE booking
exports.deleteBooking = async (req, res) => {
  try {
    await Booking.deleteBooking(req.params.id);
    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
