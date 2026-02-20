const db = require("../config/db");

// ------------------------
// GET ALL USERS
// ------------------------
exports.getAllUsers = async () => {
  const [rows] = await db.query("SELECT * FROM Users");
  return rows;
};

// ------------------------
// GET USER BY ID
// ------------------------
exports.getUserById = async (id) => {
  const [rows] = await db.query("SELECT * FROM Users WHERE id = ?", [id]);
  return rows;
};

// ------------------------
// GET USER BY EMAIL (NEW)
// ------------------------
exports.getUserByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM Users WHERE email = ?", [email]);
  return rows;
};

// ------------------------
// CREATE NEW USER
// ------------------------
exports.createUser = async ({ name, email, password, role }) => {
  const [result] = await db.query(
    "INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, password, role],
  );
  return result;
};

// ------------------------
// UPDATE USER
// ------------------------
exports.updateUser = async (id, { name, email, password, role }) => {
  const [result] = await db.query(
    "UPDATE Users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?",
    [name, email, password, role, id],
  );
  return result;
};

// ------------------------
// DELETE USER
// ------------------------
exports.deleteUser = async (id) => {
  const [result] = await db.query("DELETE FROM Users WHERE id = ?", [id]);
  return result;
};
