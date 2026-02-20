const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Secret for JWT (store in .env for production)
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// ------------------------
// REGISTER
// ------------------------
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, and password required" });
    }

    // Check if user exists
    const existingUser = await User.getUserByEmail(email);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await User.createUser({
      name,
      email,
      password: hashedPassword,
      role: role || "farmer",
    });

    res
      .status(201)
      .json({
        message: "User registered successfully",
        userId: result.insertId,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// ------------------------
// LOGIN
// ------------------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    // Find user
    const users = await User.getUserByEmail(email);
    if (users.length === 0)
      return res.status(400).json({ error: "Invalid credentials" });

    const user = users[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Create JWT token
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "12h",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
