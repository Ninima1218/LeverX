import express, { Request, Response } from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import path from "path";

import {
  getAllUsers,
  getUserById,
  getUserAuthByEmail,
  updateUserFields,
  insertUser
} from "./db";
import { User } from "../../shared/types/User";

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT_DIR = process.cwd();
const PUBLIC_DIR = path.join(ROOT_DIR, "public");
const DIST_PATH = path.join(ROOT_DIR, "dist");

app.use(cors());
app.use(express.json());

app.use("/assets", express.static(path.join(PUBLIC_DIR, "assets")));

app.post("/api/sign-in", async (req: Request, res: Response) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ success: false, message: "Missing credentials" });
  const user = getUserAuthByEmail(email);
  if (!user) return res.status(401).json({ success: false, message: "User not found" });
  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return res.status(401).json({ success: false, message: "Incorrect password" });
  return res.json({
    success: true,
    user: { ...user, password_hash: undefined }
  });
});

app.post("/api/sign-up", async (req: Request, res: Response) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ success: false, message: "Missing credentials" });
  const hash = await bcrypt.hash(String(password), 10);
  const newUser: User = {
    _id: randomUUID(),
    email,
    password_hash: hash,
    role: "Employee",
    user_avatar: "/assets/avatars/profile-avatar.webp",
    first_name: "",
    last_name: ""
  };
  insertUser(newUser);
  res.json({ success: true, user: { _id: newUser._id, email: newUser.email } });
});

app.get("/api/users", (_req, res) => res.json(getAllUsers()));
app.get("/api/users/:id", (req, res) => {
  const user = getUserById(req.params.id);
  user ? res.json(user) : res.status(404).json({ message: "Not found" });
});

app.post("/api/users", async (req: Request, res: Response) => {
  const userData = req.body;
  if (!userData.email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }
  
  const hash = await bcrypt.hash("test123", 10); // Default password for new users
  const newUser: User = {
    _id: randomUUID(),
    email: userData.email,
    password_hash: hash,
    role: userData.role || "Employee",
    user_avatar: userData.user_avatar || "/assets/avatars/profile-avatar.webp",
    first_name: userData.first_name || "",
    last_name: userData.last_name || "",
    department: userData.department,
    building: userData.building,
    room: userData.room,
    desk_number: userData.desk_number,
    phone: userData.phone,
    telegram: userData.telegram,
    cnumber: userData.cnumber,
    citizenship: userData.citizenship,
    manager_id: userData.manager_id || null
  };
  
  insertUser(newUser);
  res.json({ success: true, user: getUserById(newUser._id) });
});

app.patch("/api/users/:id", (req, res) => {
  updateUserFields(req.params.id, req.body);
  res.json({ success: true, user: getUserById(req.params.id) });
});

app.use(express.static(DIST_PATH));

app.get("*", (req, res) => {
  if (req.url.startsWith("/api") || req.url.startsWith("/assets")) {
    return res.status(404).send("Not found");
  }
  res.sendFile(path.join(DIST_PATH, "index.html"));
});

app.listen(PORT, () => {
  console.log(`\n Server is running on http://localhost:${PORT}`);
  console.log(`ROOT: ${ROOT_DIR}`);
  console.log(`Assets: ${path.join(PUBLIC_DIR, "assets")}`);
});