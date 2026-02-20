const db = require("../config/db");

exports.getAllHubs = async () => {
  const [rows] = await db.query("SELECT * FROM StorageHubs");
  return rows;
};

exports.getHubById = async (id) => {
  const [rows] = await db.query("SELECT * FROM StorageHubs WHERE id = ?", [id]);
  return rows;
};

exports.createHub = async ({ name, location, capacity, owner_id }) => {
  const [result] = await db.query(
    "INSERT INTO StorageHubs (name, location, capacity, owner_id) VALUES (?, ?, ?, ?)",
    [name, location, capacity, owner_id],
  );
  return result;
};

exports.updateHub = async (id, { name, location, capacity }) => {
  const [result] = await db.query(
    "UPDATE StorageHubs SET name = ?, location = ?, capacity = ? WHERE id = ?",
    [name, location, capacity, id],
  );
  return result;
};

exports.deleteHub = async (id) => {
  const [result] = await db.query("DELETE FROM StorageHubs WHERE id = ?", [id]);
  return result;
};
