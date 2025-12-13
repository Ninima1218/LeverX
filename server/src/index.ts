import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import { getAllUsers, getUserById, getUserAuthByEmail, updateUserFields } from "./db";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/api/sign-in", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ success: false, message: "Missing credentials" });

  const row = getUserAuthByEmail(email);
  if (!row) return res.status(401).json({ success: false, message: "Invalid credentials" });

  const ok = await bcrypt.compare(String(password), row.password_hash);
  if (!ok) return res.status(401).json({ success: false, message: "Invalid credentials" });

  return res.json({ success: true, user: { id: row._id, role: row.role, email } });
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
