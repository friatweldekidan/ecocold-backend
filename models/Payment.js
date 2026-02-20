const db = require("../config/db");

exports.getAllPayments = async () => {
  const [rows] = await db.query("SELECT * FROM Payments");
  return rows;
};

exports.getPaymentById = async (id) => {
  const [rows] = await db.query("SELECT * FROM Payments WHERE id = ?", [id]);
  return rows;
};

exports.createPayment = async ({ booking_id, amount, status }) => {
  const [result] = await db.query(
    "INSERT INTO Payments (booking_id, amount, status) VALUES (?, ?, ?)",
    [booking_id, amount, status],
  );
  return result;
};

exports.updatePayment = async (id, { amount, status }) => {
  const [result] = await db.query(
    "UPDATE Payments SET amount = ?, status = ? WHERE id = ?",
    [amount, status, id],
  );
  return result;
};

exports.deletePayment = async (id) => {
  const [result] = await db.query("DELETE FROM Payments WHERE id = ?", [id]);
  return result;
};
