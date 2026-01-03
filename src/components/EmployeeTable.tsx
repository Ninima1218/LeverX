import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { useGetUsersQuery } from "../store/usersApi";
import { useAppSelector } from "../store";
import { User } from "@shared/types/User";

const EmployeeTable: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAppSelector(s => s.auth);
  const { data: users = [], isLoading, error } = useGetUsersQuery();
  const filter = useAppSelector(s => s.filter);

  const filtered = useMemo(() => {
    return users.filter(u => {
        return Object.entries(filter).every(([key, val]) => {
            if (!val) return true;

            if (key === 'name') {
                const full = `${u.first_name ?? ""} ${u.last_name ?? ""}`.toLowerCase();
                return full.includes(String(val).toLowerCase());
            }

            const field = (u as any)[key];
            return field && String(field).toLowerCase().includes(String(val).toLowerCase());
        });
    });
}, [users, filter]);

  if (isLoading) return <div className="loading">Loading employees...</div>;
  if (error) return <div className="error">Error loading users</div>;

  return (
    <section className="address-book">
      <div className="table-controls">
        <h2 className="table-title">Employees <span>({filtered.length})</span></h2>
      </div>

      <div className="table-container">
        <table className="employees-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Email</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => {
              // Fix avatar path - handle both full paths and filenames
              let avatarSrc = "/assets/avatars/profile-avatar.webp";
              if (u.user_avatar) {
                if (u.user_avatar.startsWith("/assets/avatars/")) {
                  avatarSrc = u.user_avatar;
                } else if (u.user_avatar.startsWith("avatar") || u.user_avatar.endsWith(".webp")) {
                  avatarSrc = `/assets/avatars/${u.user_avatar}`;
                } else {
                  avatarSrc = u.user_avatar;
                }
              }

              return (
                <tr key={u._id} onClick={() => navigate(`/users/${u._id}`)} className="table-row">
                  <td className="user-cell">
                    <img src={avatarSrc} alt="" className="table-avatar" />
                    <div className="user-info">
                      <span className="user-name">{u.first_name} {u.last_name}</span>
                    </div>
                  </td>
                  <td className="email-cell">{u.email}</td>
                  <td><span className="dept-tag">{u.department || "No Dept"}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default EmployeeTable;