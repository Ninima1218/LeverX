import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import {
  getAllUsers,
  getUserById,
  getUserAuthByEmail,
  updateUserFields,
  insertUser
} from "./db";
import { User } from "./server-types";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/api/sign-in", async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Missing credentials" });
  }

  const user = getUserAuthByEmail(email);
  if (!user) {
    return res.status(401).json({ success: false, message: "User not found" });
  }

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) {
    return res.status(401).json({ success: false, message: "Incorrect password" });
  }

  return res.json({
    success: true,
    user: {
      _id: user._id,
      email: user.email,
      role: user.role,
      first_name: user.first_name,
      last_name: user.last_name,
      user_avatar: user.user_avatar
    }
  });
});

app.post("/api/sign-up", async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Missing credentials" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "Invalid email format" });
  }

  if (password.length < 6) {
    return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
  }
  if (!/[A-Z]/.test(password)) {
    return res.status(400).json({ success: false, message: "Password must contain at least one uppercase letter" });
  }
  if (!/[0-9]/.test(password)) {
    return res.status(400).json({ success: false, message: "Password must contain at least one number" });
  }

  const existing = getUserAuthByEmail(email);
  if (existing) {
    return res.status(409).json({ success: false, message: "User already exists" });
  }

  const hash = await bcrypt.hash(String(password), 10);

  const newUser: User = {
    _id: randomUUID(),
    email,
    password_hash: hash,
    role: "Employee",
    user_avatar: "./assets/avatars/profile-avatar.webp",
    first_name: "",
    last_name: ""
  };

  insertUser(newUser);

  return res.json({
    success: true,
    user: { _id: newUser._id, role: newUser.role, email: newUser.email }
  });
});

app.get("/api/users", (_req, res) => {
  res.json(getAllUsers());
});

app.get("/api/users/:id", (req, res) => {
  const user = getUserById(String(req.params.id));
  if (!user) return res.status(404).json({ success: false, message: "Not found" });
  res.json(user);
});

app.patch("/api/users/:id", (req, res) => {
  updateUserFields(String(req.params.id), req.body || {});
  const updated = getUserById(String(req.params.id));
  res.json({ success: true, user: updated });
});

app.get("/api/employees", (_req, res) => {
  res.json(getAllUsers());
});

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
