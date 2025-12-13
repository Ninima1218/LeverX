import path from "path";
import Database from "better-sqlite3";
import { User } from "./server-types";

const dbPath = path.resolve(__dirname, "../data/addressbook.db");
const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    _id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'Employee',

    isRemoteWork INTEGER,
    user_avatar TEXT,

    first_name TEXT,
    middle_name TEXT,
    last_name TEXT,

    first_native_name TEXT,
    middle_native_name TEXT,
    last_native_name TEXT,

    department TEXT,
    building TEXT,
    room TEXT,
    desk_number TEXT,

    date_birth_year INTEGER,
    date_birth_month INTEGER,
    date_birth_day INTEGER,

    manager_id TEXT,
    manager_first_name TEXT,
    manager_last_name TEXT,

    phone TEXT,
    telegram TEXT,
    cnumber TEXT,
    citizenship TEXT
  );
`);

export function insertUser(u: User) {
  const stmt = db.prepare(`
    INSERT INTO users (
      _id, email, password_hash, role,
      isRemoteWork, user_avatar,
      first_name, middle_name, last_name,
      first_native_name, middle_native_name, last_native_name,
      department, building, room, desk_number,
      date_birth_year, date_birth_month, date_birth_day,
      manager_id, manager_first_name, manager_last_name,
      phone, telegram, cnumber, citizenship
    ) VALUES (
      ?, ?, ?, ?,
      ?, ?,
      ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?, ?
    )
  `);

  stmt.run(
    u._id,
    u.email,
    u.password_hash,
    u.role,

    u.isRemoteWork ? 1 : 0,
    u.user_avatar || null,

    u.first_name || null,
    u.middle_name || null,
    u.last_name || null,

    u.first_native_name || null,
    u.middle_native_name || null,
    u.last_native_name || null,

    u.department || null,
    u.building || null,
    u.room || null,
    String(u.desk_number ?? ""),

    u.date_birth?.year ?? null,
    u.date_birth?.month ?? null,
    u.date_birth?.day ?? null,

    u.manager_id ?? null,
    u.manager?.first_name ?? null,
    u.manager?.last_name ?? null,

    u.phone || null,
    u.telegram || null,
    u.cnumber || null,
    u.citizenship || null
  );
}

export function getAllUsers(): User[] {
  return db.prepare("SELECT * FROM users").all() as User[];
}

export function getUserById(id: string): User | undefined {
  return db.prepare("SELECT * FROM users WHERE _id = ?").get(id) as User | undefined;
}

export function getUserAuthByEmail(email: string): { _id: string; role: string; password_hash: string } | undefined {
  return db
    .prepare("SELECT _id, role, password_hash FROM users WHERE email = ?")
    .get(email) as { _id: string; role: string; password_hash: string } | undefined;
}

export function updateUserFields(id: string, fields: Partial<User>): void {
  const keys = Object.keys(fields);
  if (keys.length === 0) return;

  const setClause = keys.map(k => `${k} = @${k}`).join(", ");
  const stmt = db.prepare(`UPDATE users SET ${setClause} WHERE _id = @id`);
  stmt.run({ ...fields, id });
}
