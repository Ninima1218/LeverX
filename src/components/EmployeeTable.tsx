import React, { useMemo, useState } from "react";
import { useGetUsersQuery } from "../store/usersApi";
import { useAppSelector } from "../store";
import { User } from "../../server/src/server-types";

const canEdit = (current: User, target: User) => {
  if (current.role === "Admin") return String(current._id) !== String(target._id);
  if (current.role === "HR") {
    const managerId = target.manager?.id ?? target.manager_id;
    return String(current._id) !== String(target._id) && String(managerId) === String(current._id);
  }
  return false;
};

const EmployeeTable: React.FC = () => {
  const auth = useAppSelector(s => s.auth);
  const { data: users = [], isLoading, error } = useGetUsersQuery();
  const filter = useAppSelector(s => s.filter);
  const [term, setTerm] = useState("");

  const filtered = useMemo(() => {
    const t = term.trim().toLowerCase();
    const byForm = (u: User) =>
      Object.entries(filter).every(([key, val]) => {
        if (!val) return true;
        const field = (u as any)[key];
        return field && String(field).toLowerCase().includes(String(val).toLowerCase());
      });
    return users
      .filter(u => byForm(u))
      .filter(u => {
        if (!t) return true;
        const full = `${u.first_name ?? ""} ${u.last_name ?? ""}`.toLowerCase();
        return full.includes(t) || (u.email ?? "").toLowerCase().includes(t);
      });
  }, [users, filter, term]);

  if (isLoading) return <p>Loading employees...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <section className="address-book">
      <div className="table-header">
        <h2>Address Book</h2>
        <input
          className="search-input"
          placeholder="Search employees"
          value={term}
          onChange={e => setTerm(e.target.value)}
        />
      </div>
      <table className="employees-table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Building</th>
            <th>Room</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(u => {
            const avatarSrc = u.user_avatar
              ? `/assets/avatars/${u.user_avatar}`
              : "/assets/avatars/profile-avatar.webp";
            const can = auth.user && canEdit(auth.user, u);
            return (
              <tr key={u._id}>
                <td><img src={avatarSrc} alt="avatar" className="table-avatar" /></td>
                <td>{u.first_name} {u.last_name}</td>
                <td>{u.email ?? ""}</td>
                <td>{u.department ?? ""}</td>
                <td>{u.building ?? ""}</td>
                <td>{u.room ?? ""}</td>
                <td>
                  {can ? <a className="edit-link" href={`/users/${u._id}`}>Edit</a> : ""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default EmployeeTable;
