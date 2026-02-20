const db = require("../config/db");

// Get all farmers
exports.getAllFarmers = async () => {
  const [rows] = await db.query("SELECT * FROM Farmers");
  return rows;
};

// Get farmer by ID
exports.getFarmerById = async (id) => {
  const [rows] = await db.query("SELECT * FROM Farmers WHERE id = ?", [id]);
  return rows;
};

// Create farmer
exports.createFarmer = async ({ user_id, farm_name, location, phone }) => {
  const [result] = await db.query(
    "INSERT INTO Farmers (user_id, farm_name, location, phone) VALUES (?, ?, ?, ?)",
    [user_id, farm_name, location, phone],
  );
  return result;
};

// Update farmer
exports.updateFarmer = async (id, { farm_name, location, phone }) => {
  const [result] = await db.query(
    "UPDATE Farmers SET farm_name = ?, location = ?, phone = ? WHERE id = ?",
    [farm_name, location, phone, id],
  );
  return result;
};

// Delete farmer
exports.deleteFarmer = async (id) => {
  const [result] = await db.query("DELETE FROM Farmers WHERE id = ?", [id]);
  return result;
};
