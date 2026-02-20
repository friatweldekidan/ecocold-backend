const Farmer = require("../models/Farmer");

exports.getFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.getAllFarmers();
    res.json(farmers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFarmerById = async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await Farmer.getFarmerById(id);
    if (!rows.length)
      return res.status(404).json({ message: "Farmer not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addFarmer = async (req, res) => {
  try {
    const result = await Farmer.createFarmer(req.body);
    res.json({ message: "Farmer created", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateFarmer = async (req, res) => {
  try {
    await Farmer.updateFarmer(req.params.id, req.body);
    res.json({ message: "Farmer updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteFarmer = async (req, res) => {
  try {
    await Farmer.deleteFarmer(req.params.id);
    res.json({ message: "Farmer deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
