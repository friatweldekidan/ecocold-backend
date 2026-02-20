const simulationService = require("../services/simulation.service");

exports.simulate = async (req, res) => {
  try {
    const { hub_id, scenario } = req.body;

    if (!hub_id || !scenario) {
      return res.status(400).json({
        error: "hub_id and scenario are required",
      });
    }

    const result = await simulationService.simulate(hub_id, scenario);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};
