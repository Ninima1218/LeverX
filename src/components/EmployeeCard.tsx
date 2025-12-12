import React from "react";
import defaultAvatar from "../assets/avatars/avatar1.webp";
import bagIcon from "../assets/icons/bag.svg";
import doorIcon from "../assets/icons/door.svg";

type EmployeeCardProps = {
  name: string;
  department: string;
  room: string;
  avatar?: string;
};

const EmployeeCard: React.FC<EmployeeCardProps> = ({ name, department, room, avatar }) => {
  return (
    <div className="employee-card">
      <img
        src={avatar || defaultAvatar}
        alt={`${name} avatar`}
        className="employee-avatar"
      />
      <div className="employee-info">
        <h3 className="employee-name">{name}</h3>
        <div className="employee-position">
          <img src={bagIcon} alt="department icon" />
          <span>{department}</span>
        </div>
        <div className="employee-room">
          <img src={doorIcon} alt="room icon" />
          <span>{room}</span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
