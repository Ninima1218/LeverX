import React, { useMemo, useState } from "react";
import Header from "../components/Header";
import SearchPanel from "../components/SearchPanel";
import { useAppSelector } from "../store";
import { 
  useGetUsersQuery, 
  useGetUserByIdQuery, 
  useUpdateUserMutation, 
  useDeleteUserMutation,
  useCreateUserMutation
} from "../store/usersApi";
import { User, Role } from "../../shared/types/User";

const canEdit = (current: User, target: User) => {
  if (String(current._id) === String(target._id)) return false;
  if (current.role === "Admin") return true;
  if (current.role === "HR") {
    const managerId = target.manager?.id ?? target.manager_id;
    return String(managerId) === String(current._id);
  }
  return false;
};

const Settings: React.FC = () => {
  const auth = useAppSelector(state => state.auth);
  const filter = useAppSelector(state => state.filter);
  
  const { data: users = [], isLoading } = useGetUsersQuery();
  const { data: current } = useGetUserByIdQuery(auth.userId!, { skip: !auth.userId });
  
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [createUser] = useCreateUserMutation();

  const [editing, setEditing] = useState<User | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<Partial<User>>({});

  const filtered = useMemo(() => {
    return users.filter(u => {
      const fullName = `${u.first_name || ""} ${u.last_name || ""}`.toLowerCase();
      const searchName = (filter.name || "").toLowerCase();
      if (searchName && !fullName.includes(searchName)) return false;

      const searchEmail = (filter.email || "").toLowerCase();
      if (searchEmail && !u.email.toLowerCase().includes(searchEmail)) return false;

      return true;
    });
  }, [filter, users]);

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteUser(id).unwrap();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isAdding) {
      try {
        await createUser(form).unwrap();
        handleCancel();
      } catch (err) {
        console.error("Create failed:", err);
        alert("Failed to create user. Please check all required fields.");
      }
      return;
    }
    if (!editing) return;
    try {
      await updateUser({ id: editing._id, data: form }).unwrap();
      handleCancel();
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update user.");
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setIsAdding(false);
    setForm({});
  };

  if (isLoading) return <div className="loader">Loading...</div>;

  const isCurrentUser = current && editing && String(current._id) === String(editing._id);

  return (
    <div className="page-container">
    <Header />
    <main className="main-content">
      <div className="content-wrapper">
        <SearchPanel />

        <div className="settings-main-section"> 
          <div className="table-controls" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 className="table-title">Roles & Permissions <span>({filtered.length})</span></h2>
            <button 
              className="settings-add-btn" 
              onClick={() => {
                setIsAdding(true);
                setEditing(null);
                setForm({
                  role: "Employee",
                  user_avatar: "/assets/avatars/profile-avatar.webp"
                });
              }}
            >
              Add
            </button>
          </div>

          {isAdding && (
            <div className="add-user-form-container" style={{ 
              background: "var(--card-color)", 
              borderRadius: "12px", 
              padding: "24px", 
              marginBottom: "20px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
            }}>
              <form onSubmit={submit} className="settings-form">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                        <div className="field-group">
                          <label>First Name</label>
                          <input 
                            type="text"
                            className="search-input"
                            value={form.first_name || ""} 
                            onChange={e => setForm({...form, first_name: e.target.value})}
                          />
                        </div>
                        <div className="field-group">
                          <label>Last Name</label>
                          <input 
                            type="text"
                            className="search-input"
                            value={form.last_name || ""} 
                            onChange={e => setForm({...form, last_name: e.target.value})}
                          />
                        </div>
                        <div className="field-group">
                          <label>Email *</label>
                          <input 
                            type="email"
                            className="search-input"
                            value={form.email || ""} 
                            onChange={e => setForm({...form, email: e.target.value})}
                            required
                          />
                        </div>
                        <div className="field-group">
                          <label>Role</label>
                          <select 
                            className="search-input"
                            value={form.role || "Employee"} 
                            onChange={e => setForm({...form, role: e.target.value as Role})}
                          >
                            <option value="Admin">Admin</option>
                            <option value="HR">HR</option>
                            <option value="Employee">Employee</option>
                          </select>
                        </div>
                        <div className="field-group">
                          <label>Department</label>
                          <select 
                            className="search-input"
                            value={form.department || ""} 
                            onChange={e => setForm({...form, department: e.target.value})}
                          >
                            <option value="">Select Department</option>
                            <option value="Web & Mobile">Web & Mobile</option>
                            <option value="Cybersecurity">Cybersecurity</option>
                            <option value="Tech Support">Tech Support</option>
                          </select>
                        </div>
                        <div className="field-group">
                          <label>Building</label>
                          <select 
                            className="search-input"
                            value={form.building || ""} 
                            onChange={e => setForm({...form, building: e.target.value})}
                          >
                            <option value="">Select Building</option>
                            <option value="Kazbegi 5">Kazbegi 5</option>
                            <option value="Agmashenebeli 3">Agmashenebeli 3</option>
                          </select>
                        </div>
                        <div className="field-group">
                          <label>Room</label>
                          <input 
                            type="text"
                            className="search-input"
                            value={form.room || ""} 
                            onChange={e => setForm({...form, room: e.target.value})}
                          />
                        </div>
                        <div className="field-group">
                          <label>Desk Number</label>
                          <input 
                            type="text"
                            className="search-input"
                            value={form.desk_number || ""} 
                            onChange={e => setForm({...form, desk_number: e.target.value})}
                          />
                        </div>
                        <div className="field-group">
                          <label>Phone</label>
                          <input 
                            type="tel"
                            className="search-input"
                            value={form.phone || ""} 
                            onChange={e => setForm({...form, phone: e.target.value})}
                          />
                        </div>
                        <div className="field-group">
                          <label>Telegram</label>
                          <input 
                            type="text"
                            className="search-input"
                            value={form.telegram || ""} 
                            onChange={e => setForm({...form, telegram: e.target.value})}
                          />
                        </div>
                        <div className="field-group">
                          <label>C-Number</label>
                          <input 
                            type="text"
                            className="search-input"
                            value={form.cnumber || ""} 
                            onChange={e => setForm({...form, cnumber: e.target.value})}
                          />
                        </div>
                        <div className="field-group">
                          <label>Citizenship</label>
                          <input 
                            type="text"
                            className="search-input"
                            value={form.citizenship || ""} 
                            onChange={e => setForm({...form, citizenship: e.target.value})}
                          />
                        </div>
                        <div className="field-group" style={{ gridColumn: "1 / -1" }}>
                          <label>Manager</label>
                          <select 
                            className="search-input"
                            value={form.manager_id || ""} 
                            onChange={e => setForm({...form, manager_id: e.target.value || null})}
                          >
                            <option value="">None</option>
                            {users.filter(m => m.role === "HR" || m.role === "Admin").map(m => (
                              <option key={m._id} value={m._id}>
                                {m.first_name} {m.last_name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="form-actions" style={{ gridColumn: "1 / -1", marginTop: "20px", display: "flex", gap: "16px", justifyContent: "flex-end" }}>
                          <button type="button" className="settings-cancel-btn" onClick={handleCancel}>Cancel</button>
                          <button type="submit" className="settings-save-btn">Create</button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}

          <div className="table-container">
            <table className="employees-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(u => {
                  // Fix avatar path
                  let avatarSrc = "/assets/avatars/profile-avatar.webp";
                  if (u.user_avatar) {
                    if (u.user_avatar.startsWith("/assets/avatars/")) {
                      avatarSrc = u.user_avatar;
                    } else if (u.user_avatar.startsWith("avatar") || u.user_avatar.endsWith(".webp")) {
                      avatarSrc = `/assets/avatars/${u.user_avatar.replace(/^\/assets\/avatars\//, "")}`;
                    } else {
                      avatarSrc = u.user_avatar;
                    }
                  }
                  
                  return (
                  <React.Fragment key={u._id}>
                    <tr className="table-row">
                      <td>
                        <div className="user-cell">
                          <img src={avatarSrc} className="table-avatar" alt=""/>
                          <span className="user-name">{u.first_name} {u.last_name}</span>
                        </div>
                      </td>
                    <td>{u.email}</td>
                    <td><span className={`dept-tag role-${u.role?.toLowerCase()}`}>{u.role}</span></td>
                    <td className="text-right">
                      {current && canEdit(current, u) && (
                        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                          <button 
                            className="view-profile-btn" 
                            onClick={() => { setEditing(u); setForm({ ...u }); }}
                          >
                            Edit
                          </button>
                          
                          {current.role === "Admin" && (
                            <button 
                            className="clear-btn" 
                            onClick={() => handleDelete(u._id, `${u.first_name} ${u.last_name}`)}
                          >
                            Delete
                          </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                  {editing && String(editing._id) === String(u._id) && (
                    <tr className="edit-form-row">
                      <td colSpan={4} style={{ padding: "24px", backgroundColor: "var(--secondary-background-color)" }}>
                        <form onSubmit={submit} className="settings-form" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                          <div className="field-group">
                            <label>First Name</label>
                            <input 
                              type="text"
                              className="search-input"
                              value={form.first_name || ""} 
                              onChange={e => setForm({...form, first_name: e.target.value})}
                            />
                          </div>
                          <div className="field-group">
                            <label>Last Name</label>
                            <input 
                              type="text"
                              className="search-input"
                              value={form.last_name || ""} 
                              onChange={e => setForm({...form, last_name: e.target.value})}
                            />
                          </div>
                          <div className="field-group">
                            <label>Email</label>
                            <input 
                              type="email"
                              className="search-input"
                              value={form.email || ""} 
                              onChange={e => setForm({...form, email: e.target.value})}
                              required
                            />
                          </div>
                          <div className="field-group">
                            <label>Role</label>
                            <select 
                              className="search-input"
                              value={form.role || "Employee"} 
                              onChange={e => setForm({...form, role: e.target.value as Role})}
                              disabled={isCurrentUser}
                            >
                              <option value="Admin">Admin</option>
                              <option value="HR">HR</option>
                              <option value="Employee">Employee</option>
                            </select>
                            {isCurrentUser && (
                              <p style={{ fontSize: "12px", color: "#999", marginTop: "4px" }}>
                                You cannot edit your own role
                              </p>
                            )}
                          </div>
                          <div className="field-group">
                            <label>Department</label>
                            <select 
                              className="search-input"
                              value={form.department || ""} 
                              onChange={e => setForm({...form, department: e.target.value})}
                            >
                              <option value="">Select Department</option>
                              <option value="Web & Mobile">Web & Mobile</option>
                              <option value="Cybersecurity">Cybersecurity</option>
                              <option value="Tech Support">Tech Support</option>
                            </select>
                          </div>
                          <div className="field-group">
                            <label>Building</label>
                            <select 
                              className="search-input"
                              value={form.building || ""} 
                              onChange={e => setForm({...form, building: e.target.value})}
                            >
                              <option value="">Select Building</option>
                              <option value="Kazbegi 5">Kazbegi 5</option>
                              <option value="Agmashenebeli 3">Agmashenebeli 3</option>
                            </select>
                          </div>
                          <div className="field-group">
                            <label>Room</label>
                            <input 
                              type="text"
                              className="search-input"
                              value={form.room || ""} 
                              onChange={e => setForm({...form, room: e.target.value})}
                            />
                          </div>
                          <div className="field-group">
                            <label>Desk Number</label>
                            <input 
                              type="text"
                              className="search-input"
                              value={form.desk_number || ""} 
                              onChange={e => setForm({...form, desk_number: e.target.value})}
                            />
                          </div>
                          <div className="field-group">
                            <label>Phone</label>
                            <input 
                              type="tel"
                              className="search-input"
                              value={form.phone || ""} 
                              onChange={e => setForm({...form, phone: e.target.value})}
                            />
                          </div>
                          <div className="field-group">
                            <label>Telegram</label>
                            <input 
                              type="text"
                              className="search-input"
                              value={form.telegram || ""} 
                              onChange={e => setForm({...form, telegram: e.target.value})}
                            />
                          </div>
                          <div className="field-group">
                            <label>C-Number</label>
                            <input 
                              type="text"
                              className="search-input"
                              value={form.cnumber || ""} 
                              onChange={e => setForm({...form, cnumber: e.target.value})}
                            />
                          </div>
                          <div className="field-group">
                            <label>Citizenship</label>
                            <input 
                              type="text"
                              className="search-input"
                              value={form.citizenship || ""} 
                              onChange={e => setForm({...form, citizenship: e.target.value})}
                            />
                          </div>
                          <div className="field-group" style={{ gridColumn: "1 / -1" }}>
                            <label>Manager</label>
                            <select 
                              className="search-input"
                              value={form.manager_id || ""} 
                              onChange={e => setForm({...form, manager_id: e.target.value || null})}
                            >
                              <option value="">None</option>
                              {users.filter(m => m.role === "HR" || m.role === "Admin").map(m => (
                                <option key={m._id} value={m._id}>
                                  {m.first_name} {m.last_name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="form-actions" style={{ gridColumn: "1 / -1", marginTop: "20px", display: "flex", gap: "16px", justifyContent: "flex-end" }}>
                            <button type="button" className="settings-cancel-btn" onClick={handleCancel}>Cancel</button>
                            <button type="submit" className="settings-save-btn" disabled={isCurrentUser && !isAdding}>
                              Save
                            </button>
                          </div>
                        </form>
                      </td>
                    </tr>
                  )}
                  </React.Fragment>
                );
                })}
              </tbody>
            </table>
          </div>

          </div>
          </div>
      </main>
    </div>
  );
};

export default Settings;