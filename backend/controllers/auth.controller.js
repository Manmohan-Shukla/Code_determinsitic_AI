import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../schema/auth.db.schema.js";

// ✅ SIGNUP
export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashed,
    });

    // ✅ Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // ✅ Send proper response
    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (e) {
    console.error("SIGNUP ERROR:", e);
    res.status(500).json({ error: "Server error" });
  }
}

// ✅ LOGIN
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    console.log("User being sent:", user);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (e) {
    console.error("LOGIN ERROR:", e);
    res.status(500).json({ error: "Server error" });
  }
}

// ✅ MIDDLEWARE (ADD THIS FILE IF NOT EXISTS)
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: ... }
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ✅ GET CURRENT USER
export async function getMe(req, res) {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (e) {
    console.error("GETME ERROR:", e);
    res.status(500).json({ error: "Server error" });
  }
}