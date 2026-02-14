const express = require("express");
const cors = require("cors");
require("dotenv").config();
const testRoute = require("./routes/testRoute");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/test", testRoute);

app.get("/", (req, res) => {
  res.send("EcoCold API Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
