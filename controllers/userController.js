const User = require("../models/User");

// GET all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await User.getUserById(id);
    if (!rows.length)
      return res.status(404).json({ message: "User not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create user
exports.addUser = async (req, res) => {
  try {
    const result = await User.createUser(req.body);
    res.json({ message: "User created", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT update user
exports.updateUser = async (req, res) => {
  try {
    await User.updateUser(req.params.id, req.body);
    res.json({ message: "User updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE user
exports.deleteUser = async (req, res) => {
  try {
    await User.deleteUser(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
