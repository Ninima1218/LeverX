import React, { useState, useEffect } from "react";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(v => !v);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onClick = () => setOpen(false);
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  return (
    <>
      <header className="header">
        <div className="header__left">
          <h3>LEVERX EMPLOYEE SERVICES</h3>
          <h1>Company</h1>
        </div>
        <div className="header__center">
          <div className="address-book-title">
            Address Book
            <a className="settings-link" href="/settings">Settings</a>
          </div>
        </div>
        <div className="header__right">
          <button className="support-btn">Support</button>
          <div className="user-info">
            <img className="user-avatar" src={require("../assets/avatars/avatar1.webp")} alt="avatar" />
            <span className="user-name">Hermione</span>
          </div>
          <button className="signout-btn">
            <img className="signout-icon" src={require("../assets/icons/signout.svg")} alt="sign out" />
          </button>
        </div>
        <button className="burger-btn" onClick={e => { e.stopPropagation(); toggle(); }}>
          <img src={require("../assets/icons/menu.svg")} alt="menu" />
        </button>
      </header>

      <nav className={`menu--mobile ${open ? "open" : ""}`} onClick={e => e.stopPropagation()}>
        <div className="menu-header">
          <button className="close-btn" onClick={close}>×</button>
        </div>
        <div className="user-info" onClick={() => window.location.href = "/profile"}>
          <img className="user-avatar" src={require("../assets/avatars/avatar1.webp")} alt="avatar" />
          <span className="user-name">Hermione</span>
        </div>
        <a className="menu-link" href="/address-book">Address Book</a>
        <a className="menu-link" href="/settings">Settings</a>
        <button className="signout-btn">Sign out</button>
        <div className="menu-footer">
          <button className="support-btn">Support</button>
        </div>
      </nav>
    </>
  );
};

export default Header;
