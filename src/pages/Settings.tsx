import React, { useMemo, useState } from "react";
import Header from "../components/Header";
import SearchPanel from "../components/SearchPanel";
import { useAppSelector } from "../store";
import { 
  useGetUsersQuery, 
  useGetUserByIdQuery, 
  useUpdateUserMutation, 
  useDeleteUserMutation 
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

  const [editing, setEditing] = useState<User | null>(null);
  const [form, setForm] = useState<Partial<User>>({});

  const filtered = useMemo(() => {
    return users.filter(u => {
      const fullName = `${u.first_name} ${u.last_name}`.toLowerCase();
      const searchName = (filter.name || "").toLowerCase();
      if (searchName && !fullName.includes(searchName)) return false;

      return Object.entries(filter).every(([key, value]) => {
        if (!value || key === "name") return true;
        const userValue = (u as any)[key];
        return String(userValue).toLowerCase().includes(String(value).toLowerCase());
      });
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
    if (!editing) return;
    await updateUser({ id: editing._id, data: form }).unwrap();
    setEditing(null);
  };

  if (isLoading) return <div className="loader">Loading...</div>;

  return (
    <div className="page-container">
    <Header />
    <main className="main-content">
      <div className="content-wrapper">
        <SearchPanel />

        <div className="settings-main-section"> 
          <div className="table-controls">
            <h2 className="table-title">Roles & Permissions <span>({filtered.length})</span></h2>
          </div>

          <div className="table-container">
            <table className="employees-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(u => (
                  <tr key={u._id} className="table-row">
                    <td>
                      <div className="user-cell">
                        <img src={u.user_avatar || "/default-avatar.png"} className="table-avatar" alt=""/>
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
                ))}
              </tbody>
            </table>
          </div>

          {editing && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-header">
                  <h3>Edit Permissions</h3>
                  <button className="close-modal" onClick={() => setEditing(null)}>&times;</button>
                </div>
                <form className="modal-form" onSubmit={submit}>
                  <div className="field-group">
                    <label>Role</label>
                    <select 
                       className="search-input"
                       value={form.role} 
                       onChange={e => setForm({...form, role: e.target.value as Role})}
                    >
                      <option value="Admin">Admin</option>
                      <option value="HR">HR</option>
                      <option value="Employee">Employee</option>
                    </select>
                  </div>
                  <div className="form-actions" style={{ marginTop: "20px" }}>
                    <button type="button" className="clear-btn" onClick={() => setEditing(null)}>Cancel</button>
                    <button type="submit" className="search-btn">Save</button>
                  </div>
                </form>
              </div>
            </div>
          )}
          </div>
          </div>
      </main>
    </div>
  );
};

export default Settings;