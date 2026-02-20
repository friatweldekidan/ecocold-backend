const db = require("../config/db");

exports.getAllBookings = async () => {
  const [rows] = await db.query("SELECT * FROM Bookings");
  return rows;
};

exports.getBookingById = async (id) => {
  const [rows] = await db.query("SELECT * FROM Bookings WHERE id = ?", [id]);
  return rows;
};

exports.createBooking = async ({ farmer_id, hub_id, crates, booking_date }) => {
  const [result] = await db.query(
    "INSERT INTO Bookings (farmer_id, hub_id, crates, booking_date) VALUES (?, ?, ?, ?)",
    [farmer_id, hub_id, crates, booking_date],
  );
  return result;
};

exports.updateBooking = async (id, { crates, status }) => {
  const [result] = await db.query(
    "UPDATE Bookings SET crates = ?, status = ? WHERE id = ?",
    [crates, status, id],
  );
  return result;
};

exports.deleteBooking = async (id) => {
  const [result] = await db.query("DELETE FROM Bookings WHERE id = ?", [id]);
  return result;
};
