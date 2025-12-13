import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { User, Role } from "../../server/src/server-types";

const canEdit = (current: User, target: User) => {
  if (current.role === "Admin") return String(current._id) !== String(target._id);
  if (current.role === "HR") {
    const managerId = target.manager?.id ?? target.manager_id;
    return String(current._id) !== String(target._id) && String(managerId) === String(current._id);
  }
  return false;
};

const Settings: React.FC = () => {
  const { auth } = useAuth();
  const [current, setCurrent] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [term, setTerm] = useState("");

  useEffect(() => {
    if (auth.userId) fetch(`/api/users/${auth.userId}`).then(r=>r.json()).then(setCurrent);
    fetch("/api/users").then(r => r.json()).then(setUsers);
  }, [auth.userId]);

  const filtered = useMemo(() => {
    const t = term.toLowerCase();
    return users.filter(u =>
      u.first_name.toLowerCase().includes(t) ||
      u.last_name.toLowerCase().includes(t) ||
      (u.email ?? "").toLowerCase().includes(t)
    );
  }, [term, users]);

  const [editing, setEditing] = useState<User | null>(null);
  const [form, setForm] = useState<Partial<User>>({});

  const startEdit = (u: User) => {
    if (!current || !canEdit(current, u)) return;
    setEditing(u);
    setForm({
      first_name: u.first_name, last_name: u.last_name,
      first_native_name: u.first_native_name, last_native_name: u.last_native_name, middle_native_name: u.middle_native_name,
      email: u.email, phone: u.phone, telegram: u.telegram, citizenship: u.citizenship, role: u.role
    });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    await fetch(`/api/users/${editing._id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setUsers(prev => prev.map(u => (String(u._id) === String(editing._id) ? { ...u, ...form } as User : u)));
    setEditing(null);
  };

  return (
    <>
      <Header />
      <main className="main-content">
        <div className="content-wrapper">
          <h2>Roles & Permissions</h2>
          <input id="search" placeholder="Search" value={term} onChange={e=>setTerm(e.target.value)} />
          <table id="roles-table">
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u._id}>
                  <td>{u.first_name} {u.last_name}</td>
                  <td>{u.email ?? ""}</td>
                  <td>{u.role}</td>
                  <td>{current && canEdit(current, u) ? <button className="edit-btn" onClick={() => startEdit(u)}>Edit</button> : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {editing && (
            <div id="edit-modal">
              <form id="edit-form" onSubmit={submit}>
                <input name="first_name" value={form.first_name||""} onChange={e=>setForm({ ...form, first_name: e.target.value })} />
                <input name="last_name" value={form.last_name||""} onChange={e=>setForm({ ...form, last_name: e.target.value })} />
                <input name="email" value={form.email||""} onChange={e=>setForm({ ...form, email: e.target.value })} />
                <select name="role" value={form.role||"Employee"} onChange={e=>setForm({ ...form, role: e.target.value as Role })}>
                  <option>Admin</option><option>HR</option><option>Employee</option>
                </select>
                <button type="submit">Save</button>
                <button type="button" id="cancel-edit" onClick={() => setEditing(null)}>Cancel</button>
              </form>
            </div>
          )}
        </div>
      </main>
    </>
  );
};
export default Settings;
