import React from "react";
import { Link } from "react-router-dom";
import "../styles/_header.scss";
import logoIcon from "../assets/icons/favicon.webp";
import supportIcon from "../assets/icons/support.svg";
import signoutIcon from "../assets/icons/signout.svg";
import burgerIcon from "../assets/icons/burger-menu.svg";

const Header: React.FC = () => {
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
        <Link to="/settings" className="settings-tab">Settings</Link>
      </div>

      <div className="header__right">
        <button className="burger-btn" aria-label="Toggle menu">
          <img src={burgerIcon} alt="menu icon" className="menu-icon" />
        </button>

        <button className="support-btn">
          <span className="support-icon">
            <img src={supportIcon} alt="support-icon" />
          </span>
          SUPPORT
        </button>

        <div className="user-info">
          <img src={logoIcon} alt="profile-avatar" className="user-avatar" />
          <span className="user-name">User</span>
        </div>

        <button className="signout-btn">
          <img src={signoutIcon} alt="signout-icon" className="signout-icon" />
        </button>
      </div>
    </header>
  );
};

export default Header;
