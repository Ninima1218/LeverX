import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onWindowClick = () => setOpen(false);
    const timer = setTimeout(() => {
        window.addEventListener("click", onWindowClick);
    }, 0);

    return () => {
        clearTimeout(timer);
        window.removeEventListener("click", onWindowClick);
    };
  }, [open]);

  const signOut = () => {
    dispatch(clearAuth());
    navigate("/sign-in", { replace: true });
    close(); 
  };

  const profilePath = auth.user ? `/users/${auth.user._id}` : "#";

  return (
    <>
      {open && <div className="menu-overlay" onClick={close} />}

      <header className="header">
        <Link to="/" className="header__left company-link">
          <h3>LEVERX</h3>
          <h1>EMPLOYEE SERVICES</h1>
        </Link>

        <div className="header__center">
          <nav className="address-book-title">
            <NavLink to="/" className="address-link">Address Book</NavLink>
            {auth.role === "Admin" && (
              <NavLink className="settings-link" to="/settings">Settings</NavLink>
            )}
          </nav>
        </div>

        <div className="header__right">
          <button className="support-btn">
            <img src={require("../assets/icons/support.svg")} alt="support" />
            <span>Support</span>
          </button>

          <div className="user-wrapper">
            {auth.user && (
              <Link to={profilePath} className="user-info">
                <img
                  className="user-avatar"
                  src={
                    !auth.user.user_avatar
                      ? "/assets/avatars/profile-avatar.webp"
                      : auth.user.user_avatar.startsWith("/assets/avatars/")
                      ? auth.user.user_avatar
                      : `/assets/avatars/${auth.user.user_avatar.replace(/^\/assets\/avatars\//, "")}`
                  }
                  alt="avatar"
                />
                <span className="user-name">
                  {auth.user.first_name} {auth.user.last_name}
                </span>
              </Link>
            )}
            
            <button className="signout-btn" onClick={signOut} title="Sign Out">
              <img src={require("../assets/icons/signout.svg")} alt="sign out" />
            </button>
          </div>
        </div>

        <button
        className="burger-btn"
        onClick={e => {
          e.stopPropagation();
          toggle();
        }}
        aria-label="Toggle menu">
        <img src={require("../assets/icons/menu.svg")} alt="menu" />
      </button>
      </header>

      <nav
        className={`menu--mobile ${open ? "open" : ""}`}
        onClick={e => e.stopPropagation()}
      >
        {auth.user && (
          <Link to={profilePath} className="user-profile" onClick={close}>
            <img
              className="user-avatar"
              src={
                !auth.user.user_avatar
                  ? "/assets/avatars/profile-avatar.webp"
                  : auth.user.user_avatar.startsWith("/assets/avatars/")
                  ? auth.user.user_avatar
                  : `/assets/avatars/${auth.user.user_avatar.replace(/^\/assets\/avatars\//, "")}`
              }
              alt="avatar"
            />
            <div className="user-info-text">
              <span className="user-name">
                {auth.user.first_name} {auth.user.last_name}
              </span>
            </div>
          </Link>
        )}

        <div className="mobile-nav">
          <NavLink className="nav-link" to="/" onClick={close}>
            Address Book
          </NavLink>

          {auth.role === "Admin" && (
            <NavLink className="nav-link" to="/settings" onClick={close}>
              Settings
            </NavLink>
          )}
        </div>

        <div className="mobile-footer">
          <button className="support-btn" onClick={() => { close(); }}>
            <img
              src={require("../assets/icons/support.svg")}
              alt="support"
              className="support-icon"
            />
            <span>Support</span>
          </button>

          <button className="signout-link" onClick={signOut}>
            Sign Out
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;