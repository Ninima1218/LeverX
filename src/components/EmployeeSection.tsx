import React from "react";
import "../styles/_employee.scss";
import gridIcon from "../assets/icons/squares.svg";
import listIcon from "../assets/icons/list-view.svg";
import circleIcon from "../assets/icons/circle.svg";
import userIcon from "../assets/icons/user.svg";
import bagIcon from "../assets/icons/bag.svg";
import doorIcon from "../assets/icons/door.svg";
import notFoundImage from "../assets/images/not-found.webp";
import EmployeeCard from "./EmployeeCard";

const EmployeeSection: React.FC = () => {
  return (
    <section className="employee-section">
      {/* Toolbar */}
      <div className="employee-toolbar">
        <span className="employee-count">9 employees displayed</span>
        <div className="view-toogle">
          <label className="view-btn grid">
            <img src={gridIcon} alt="grid view icon" className="icon-grid" />
          </label>
          <label className="view-btn list">
            <img src={listIcon} alt="list view icon" className="icon-list" />
          </label>
        </div>
      </div>

      {/* Header row */}
      <div className="employee-list-header">
        <span className="col-photo">
          <img src={circleIcon} alt="circle-icon" className="col-icon" />
          Photo
        </span>
        <span className="col-name">
          <img src={userIcon} alt="user-icon" className="col-icon" />
          Name
        </span>
        <span className="col-department">
          <img src={bagIcon} alt="bag" className="col-icon" />
          Department
        </span>
        <span className="col-room">
          <img src={doorIcon} alt="door" className="col-icon" />
          Room
        </span>
      </div>

      {/* Cards container */}
      <div className="employee-cards-container">
        {/* Пример карточки */}
        <EmployeeCard
          name="John Smith"
          department="Web & Mobile"
          room="303.1"
          avatar=""
        />
      </div>

      {/* Not found */}
      <div className="not-found-wrapper">
        <img
          src={notFoundImage}
          alt="Nothing found illustration"
          className="not-found-image"
        />
        <h2 className="not-found-title">Nothing found</h2>
        <p className="not-found-text">
          No result match your search. Consider trying different search request
        </p>
      </div>
    </section>
  );
};

export default EmployeeSection;
