const pool = require("../config/db");
const fs = require("fs");
const path = require("path");
const { sendFarmerSMS } = require("./sms.service");

// Load scenarios from JSON file
const scenariosPath = path.join(__dirname, "../data/scenarios.json");
const scenarios = JSON.parse(fs.readFileSync(scenariosPath, "utf8"));

exports.simulate = async (hubId, scenarioKey) => {
  const scenario = scenarios[scenarioKey];
  if (!scenario) throw new Error("Invalid scenario key. Use A, B, or C.");

  let alertType = "none";

  if (scenario.risk_score >= 0.95) {
    alertType = "farmer_sms";
  } else if (scenario.risk_score >= 0.5) {
    alertType = "operator_push";
  }

  // 1️⃣ Save simulation log
  await pool.query(
    `INSERT INTO HubSensorLogs
     (hub_id, scenario, scenario_label,
      temperature_celsius, battery_level_percent,
      door_status, door_open_minutes,
      temp_rise_rate_per_min, risk_score, alert_triggered)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      hubId,
      scenarioKey,
      scenario.label,
      scenario.temperature_celsius,
      scenario.battery_level_percent,
      scenario.door_status,
      scenario.door_open_minutes,
      scenario.temp_rise_rate_per_min,
      scenario.risk_score,
      alertType,
    ],
  );

  // 2️⃣ Send SMS for Scenario C
  if (alertType === "farmer_sms") {
    // Get farmers with approved bookings for this hub
    const [farmers] = await pool.query(
      `
      SELECT DISTINCT f.id, f.phone
      FROM Farmers f
      JOIN Bookings b ON b.farmer_id = f.id
      WHERE b.hub_id = ? AND b.status = 'approved'
    `,
      [hubId],
    );

    for (const farmer of farmers) {
      const message =
        "🚨 EcoCold ALERT: Storage temperature critical. Immediate action required!";
      const smsResult = await sendFarmerSMS(farmer.phone, message);

      // Log SMS attempt
      await pool.query(
        `INSERT INTO Alerts
         (hub_id, farmer_id, alert_type, message, delivery_status)
         VALUES (?, ?, 'farmer_sms', ?, ?)`,
        [hubId, farmer.id, message, smsResult.success ? "sent" : "failed"],
      );
    }
  }

  // 3️⃣ Return simulation result
  return { scenario: scenario.label, ...scenario, alert_triggered: alertType };
};
