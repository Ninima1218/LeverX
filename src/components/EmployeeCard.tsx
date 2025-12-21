import React from "react";
import { Link } from "react-router-dom"; 
import bagIcon from "../assets/icons/bag.svg";
import doorIcon from "../assets/icons/door.svg";

type EmployeeCardProps = {
  id: string; 
  name: string;
  department: string;
  room: string;
  avatar?: string;
  view?: "grid" | "list"; 
};

const EmployeeCard: React.FC<EmployeeCardProps> = ({ id, name, department, room, avatar, view = "grid" }) => {
  const avatarSrc = avatar ? avatar : "/assets/avatars/profile-avatar.webp";

  return (
    <Link to={`/users/${id}`} className={`employee-card ${view}-view`}>
      <img
        src={avatarSrc}
        alt={`${name} avatar`}
        className="employee-avatar"
      />

      <div className="employee-name">{name}</div>

      <div className="employee-detail-item">
        {view === "grid" && <img src={bagIcon} alt="" />}
        <span>{department}</span>
      </div>

      <div className="employee-detail-item">
        {view === "grid" && <img src={doorIcon} alt="" />}
        <span>{room}</span>
      </div>
    </Link>
  );
};

export default EmployeeCard;