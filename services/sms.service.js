require("dotenv").config();
const fetch = require("node-fetch");

const TEXTBELT_KEY = process.env.TEXTBELT_KEY || "textbelt";

/**
 * Send SMS using Textbelt API
 * @param {string} phone - Recipient phone number (with country code)
 * @param {string} message - Message text to send
 * @returns {Promise<{success: boolean, response: object}>} - SMS send result
 */
exports.sendFarmerSMS = async (phone, message) => {
  try {
    const res = await fetch("https://textbelt.com/text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: phone,
        message: message,
        key: TEXTBELT_KEY,
      }),
    });

    const data = await res.json();
    console.log("Textbelt response:", data);

    return { success: data.success || false, response: data };
  } catch (error) {
    console.error("SMS failed:", error.message);
    return { success: false, response: null };
  }
};
