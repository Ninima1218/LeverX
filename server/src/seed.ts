import fs from "fs";
import path from "path";
import { insertUser } from "./db";
import { Role, User } from "@shared/types/User";

const usersJsonPath = path.resolve(process.cwd(), "users.json");
console.log("Loading:", usersJsonPath);
const raw = fs.readFileSync(usersJsonPath, "utf-8");
const users = JSON.parse(raw) as any[];

const PASSWORD_HASH = "$2b$10$GlkQK.0iS.n2Am/3cvze9.OIzv5bh4DlSl/Ev7rFb3FtBqfS9wUXq";

function assignRole(id: string): Role {
  if (id === "28") return "Admin";
  if (id === "1" || id === "2") return "HR";
  return "Employee";
}

function normalizeManager(u: any): { manager_id: string | null; manager: User["manager"] } {
  const id = String(u._id);
  const isManager = id === "1" || id === "2";
  if (isManager) return { manager_id: null, manager: null };

  if (u.manager && (u.manager.id === "1" || u.manager.id === "2")) {
    return { manager_id: String(u.manager.id), manager: u.manager };
  }
  return { manager_id: "1", manager: { id: "1", first_name: "John", last_name: "Smith" } };
}

for (const u of users) {
  const { manager_id, manager } = normalizeManager(u);

  insertUser({
    _id: String(u._id),
    email: String(u.email || `${(u.first_name || "").toLowerCase()}.${(u.last_name || "").toLowerCase()}@leverx.com`),
    password_hash: PASSWORD_HASH,
    role: assignRole(String(u._id)),

    isRemoteWork: Boolean(u.isRemoteWork),
    user_avatar: u.user_avatar || "./assets/avatars/profile-avatar.webp",

    first_name: u.first_name || "",
    middle_name: u.middle_name || u.middle_native_name || "",
    last_name: u.last_name || "",

    first_native_name: u.first_native_name || "",
    middle_native_name: u.middle_native_name || "",
    last_native_name: u.last_native_name || "",

    department: u.department || "",
    building: u.building || "",
    room: u.room || "",
    desk_number: u.desk_number ?? "",

    date_birth: u.date_birth || undefined,

    manager_id,
    manager,

    phone: u.phone || "",
    telegram: u.telegram || "",
    cnumber: u.cnumber || "",
    citizenship: u.citizenship || ""
  });
}

console.log(`Seed complete: ${users.length} users inserted. Password: "test123".`);
