const StorageHub = require("../models/StorageHub");

// GET all hubs
exports.getHubs = async (req, res) => {
  try {
    const hubs = await StorageHub.getAllHubs();
    res.json(hubs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET hub by ID
exports.getHubById = async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await StorageHub.getHubById(id);
    if (!rows.length) return res.status(404).json({ message: "Hub not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create a hub
exports.addHub = async (req, res) => {
  try {
    const result = await StorageHub.createHub(req.body);
    res.json({ message: "Hub created", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT update a hub
exports.updateHub = async (req, res) => {
  try {
    await StorageHub.updateHub(req.params.id, req.body);
    res.json({ message: "Hub updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE a hub
exports.deleteHub = async (req, res) => {
  try {
    await StorageHub.deleteHub(req.params.id);
    res.json({ message: "Hub deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
