import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../schema/auth.db.schema.js";
export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!email || !password || !username) {
      console.log("Missing feild");
      return res.status(400).json({
        error: "Missing auth controller.js",
      });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ error: "user Control already exist" });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashed,
    });
    res.status(201).json({
      message: "USer created succesfully",
      username,
      email,
      hashed,
    });
  } catch (e) {
    console.error("SIGNUP ERROR:", e);
    res.status(500).json({
      error: "catched",
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log("Missing field");
      return res.status(400).json({
        error: "Missing auth controller.js",
      });
    }
    const exist = await User.findOne({ email });
    if (!exist) {
      return res.status(400).json({ error: "invalid exist" });
    }
    const ok = await bcrypt.compare(password, exist.password);
    if (!ok) {
      return res.status(400).json({ error: "invalid password" });
    }

    const token = jwt.sign({ id: exist._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(201).json({
      message: "USer created succesfully",
      token,
    });
  } catch (e) {
    res.status(500).json({
      error: "catched",
    });
  }
}
export async function getMe(req, res) {
  res.json(req.user);
}
