import express from "express";
import cors from "cors";
import Database from "better-sqlite3";

const app = express();
const PORT = 3001;

const db = new Database("server/data/addressbook.db");

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    position TEXT,
    room TEXT,
    avatar TEXT
  )
`).run();

const count = db.prepare("SELECT COUNT(*) AS c FROM employees").get() as { c: number };
if (count.c === 0) {
  const insert = db.prepare(
    "INSERT INTO employees (name, position, room, avatar) VALUES (?, ?, ?, ?)"
  );
  insert.run("Иван Иванов", "Frontend Developer", "302", "avatar1.webp");
  insert.run("Анна Петрова", "UX Designer", "210", "avatar1.webp");
}

app.use(cors());
app.use(express.json());

app.post("/api/sign-up", (req, res) => {
  const { email, password } = req.body;
  try {
    const stmt = db.prepare("INSERT INTO users (email, password) VALUES (?, ?)");
    const result = stmt.run(email, password);
    res.json({ success: true, id: result.lastInsertRowid, email });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
});

app.post("/api/sign-in", (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare("SELECT * FROM users WHERE email=? AND password=?").get(email, password);
  if (user) res.json({ success: true, user });
  else res.status(401).json({ success: false, message: "Invalid credentials" });
});

app.get("/api/employees", (_req, res) => {
  const employees = db.prepare("SELECT * FROM employees").all();
  res.json(employees);
});

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
