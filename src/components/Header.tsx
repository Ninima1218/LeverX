import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User } from "../../server/src/server-types";

const Header: React.FC = () => {
  const { auth, clearAuth } = useAuth();
  const navigate = useNavigate();
  const [current, setCurrent] = useState<User | null>(null);

  useEffect(() => {
    if (!auth.userId) return;
    fetch(`/api/users/${auth.userId}`)
      .then(r => r.json())
      .then(setCurrent)
      .catch(() => setCurrent(null));
  }, [auth.userId]);

  const fullName = current ? [current.first_name, current.last_name].filter(Boolean).join(" ") : "Guest";
  const avatar = current?.user_avatar || "/assets/avatars/profile-avatar.webp";

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/" className="company-link">
          <h3>LEVERX</h3>
          <h1>EMPLOYEE SERVICES</h1>
        </Link>
      </div>
      <div className="header__center">
        <div className="address-book-title">Address Book</div>
        {auth.role === "Admin" && (
          <Link to="/settings" className="settings-tab">Settings</Link>
        )}
      </div>
      <div className="header__right">
        <button className="support-btn">
          <span className="support-icon">
            <img src="/assets/icons/support.svg" alt="support-icon" />
          </span>
          SUPPORT
        </button>
        <div className="user-info" onClick={() => current && navigate(`/users/${encodeURIComponent(String(current._id))}`)}>
          <img src={avatar} alt="profile-avatar" className="user-avatar" />
          <span className="user-name">{fullName}</span>
        </div>
        <button className="signout-btn" onClick={() => { clearAuth(); navigate("/sign-in"); }}>
          <img src="/assets/icons/signout.svg" alt="signout-icon" className="signout-icon" />
        </button>
      </div>
    </header>
  );
};

export default Header;
