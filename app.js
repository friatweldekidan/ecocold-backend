const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const farmerRoutes = require("./routes/farmerRoutes");
const hubRoutes = require("./routes/hubRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const simulationRoutes = require("./routes/simulation.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Public routes
app.use("/api/auth", authRoutes);

// Protected routes
app.use("/api/users", userRoutes);
app.use("/api/farmers", farmerRoutes);
app.use("/api/hubs", hubRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/simulate", simulationRoutes);

app.get("/", (req, res) => {
  res.send("EcoCold API Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
