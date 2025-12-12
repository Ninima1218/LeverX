import path from "path";
import express, { Request, Response } from "express";
import sqlite3 from "sqlite3";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const dbPath = path.join(__dirname, "..", "data", "users.db");
const db = new (sqlite3.verbose()).Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      _id TEXT PRIMARY KEY,
      first_name TEXT,
      last_name TEXT,
      email TEXT,
      department TEXT,
      room TEXT,
      phone TEXT,
      telegram TEXT,
      citizenship TEXT,
      avatar TEXT
    )
  `);
});

type User = {
  _id: string;
  first_name: string;
  last_name: string;
  email?: string;
  department?: string;
  room?: string;
  phone?: string;
  telegram?: string;
  citizenship?: string;
  avatar?: string;
};

app.get("/users", (_req: Request, res: Response) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json((rows || []) as User[]);
  });
});

app.get("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  db.get("SELECT * FROM users WHERE _id = ?", [id], (err, row) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "DB error" });
    }
    if (!row) return res.status(404).json({ error: "User not found" });
    res.json(row as User);
  });
});

app.post("/sign-in", (_req: Request, res: Response) => {
  res.json({ ok: true });
});

app.post("/sign-up", (req: Request, res: Response) => {
  const u = req.body as Partial<User>;
  const id = u._id || String(Date.now());
  const values = [
    id,
    u.first_name || "",
    u.last_name || "",
    u.email || "",
    u.department || "",
    u.room || "",
    u.phone || "",
    u.telegram || "",
    u.citizenship || "",
    u.avatar || ""
  ];

  db.run(
    `INSERT INTO users (_id, first_name, last_name, email, department, room, phone, telegram, citizenship, avatar)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    values,
    function (err) {
      if (err) {
        console.error("DB insert error:", err);
        return res.status(500).json({ error: "DB insert error" });
      }
      res.status(201).json({ ok: true, _id: id });
    }
  );
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
