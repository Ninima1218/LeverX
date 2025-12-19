import React from "react";
import bagIcon from "../assets/icons/bag.svg";
import doorIcon from "../assets/icons/door.svg";

type EmployeeCardProps = {
  name: string;
  department: string;
  room: string;
  avatar?: string;
};

const EmployeeCard: React.FC<EmployeeCardProps> = ({ name, department, room, avatar }) => {

  const avatarSrc = avatar ? avatar : "/assets/avatars/profile-avatar.webp";

  return (
    <div className="employee-card">
      <img
        src={avatarSrc}
        alt={`${name} avatar`}
        className="employee-avatar"
      />
      <div className="employee-info">
        <div className="employee-name">{name}</div>
        <div className="employee-details">
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
    </div>
  );
};

export default EmployeeCard;
