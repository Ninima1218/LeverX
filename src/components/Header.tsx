import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store";
import { clearAuth } from "../store/authSlice";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(v => !v);
  const close = () => setOpen(false);

  const auth = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const onClick = () => setOpen(false);
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  const signOut = () => {
    dispatch(clearAuth());
    navigate("/sign-in", { replace: true });
  };

  return (
    <>
      <header className="header">
        <Link to="/home" className="header__left">
          <h3>LEVERX</h3>
          <h1>EMPLOYEE SERVICES</h1>
        </Link>

        <div className="header__center">
          <div className="address-book-title">
            <Link to="/address-book" className="address-link">Address Book</Link>
            {auth.role === "Admin" && (
              <Link className="settings-link" to="/settings">Settings</Link>
            )}
          </div>
        </div>

        <div className="header__right">
          <button className="support-btn">
            <img
              src={require("../assets/icons/support.svg")}
              alt="support"
              className="support-icon"
            />
            Support
          </button>
          <div className="user-info">
            <img
              className="user-avatar"
              src={auth.user?.user_avatar
                ? `/assets/avatars/${auth.user.user_avatar}`
                : "/assets/avatars/profile-avatar.webp"}
              alt="avatar"
            />
            <span className="user-name">{auth.user?.first_name ?? "User"}</span>
          </div>
          <button className="signout-btn" onClick={signOut}>
            <img
              className="signout-icon"
              src={require("../assets/icons/signout.svg")}
              alt="sign out"
            />
          </button>
        </div>

        <button
          className="burger-btn"
          onClick={e => {
            e.stopPropagation();
            toggle();
          }}
        >
          <img src={require("../assets/icons/menu.svg")} alt="menu" />
        </button>
      </header>

       <nav
        className={`menu--mobile ${open ? "open" : ""}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="menu-header">
          <button className="close-btn" onClick={close}>×</button>
        </div>

        <div className="user-info">
          <img
            className="user-avatar"
            src={auth.user?.user_avatar
              ? `/assets/avatars/${auth.user.user_avatar}`
              : "/assets/avatars/profile-avatar.webp"}
            alt="avatar"
          />
          <span className="user-name">
            {auth.user?.first_name ?? "User"} {auth.user?.last_name ?? ""}
          </span>
        </div>

        <button className="signout-btn" onClick={signOut}>
          <img
            className="signout-icon"
            src={require("../assets/icons/signout.svg")}
            alt="sign out"
          />
          Sign Out
        </button>

        <Link className="menu-link" to="/address-book">Address Book</Link>

        {auth.role === "Admin" && (
          <Link className="menu-link" to="/settings">Settings</Link>
        )}

        <div className="menu-footer">
          <button className="support-btn">
            <img
              src={require("../assets/icons/support.svg")}
              alt="support"
              className="support-icon"
            />
            Support
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;
