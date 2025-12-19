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

app.use(cors());
app.use(express.json());

/** * КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ: 
 * Мы используем __dirname (путь к текущему файлу), чтобы точно найти папку public.
 * Из server/src мы выходим на 2 уровня вверх в корень HW1.
 */
const PUBLIC_DIR = path.join(__dirname, "../../public");

// Сначала раздаем аватарки. Если файл есть — сервер его отдаст и НЕ пойдет дальше.
app.use("/assets", express.static(path.join(PUBLIC_DIR, "assets")));

// --- API Роуты ---

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

app.patch("/api/users/:id", (req, res) => {
  updateUserFields(req.params.id, req.body);
  res.json({ success: true, user: getUserById(req.params.id) });
});

// --- Работа с фронтендом ---

// Путь к собранному фронтенду (dist)
const DIST_PATH = path.join(__dirname, "../../dist");
app.use(express.static(DIST_PATH));

// Любой запрос, который не API и не картинка — отдаем фронтенд
app.get("*", (req, res) => {
  // Если это запрос к ассетам, но мы сюда попали — значит файла нет. 404 вместо редиректа.
  if (req.url.startsWith("/assets")) {
    return res.status(404).send("File not found");
  }
  res.sendFile(path.join(DIST_PATH, "index.html"));
});

app.listen(PORT, () => {
  console.log(`\n✅ Server is running on http://localhost:${PORT}`);
  console.log(`📂 Serving assets from: ${path.join(PUBLIC_DIR, "assets")}`);
});