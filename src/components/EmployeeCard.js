import React from "react";
import bagIcon from "../assets/icons/bag.svg";
import doorIcon from "../assets/icons/door.svg";
const EmployeeCard = ({ name, department, room, avatar }) => {
    const avatarSrc = avatar
        ? `/assets/avatars/${avatar}`
        : "/assets/avatars/profile-avatar.webp";
    return (React.createElement("div", { className: "employee-card" },
        React.createElement("img", { src: avatarSrc, alt: `${name} avatar`, className: "employee-avatar" }),
        React.createElement("div", { className: "employee-info" },
            React.createElement("div", { className: "employee-name" }, name),
            React.createElement("div", { className: "employee-details" },
                React.createElement("div", { className: "employee-position" },
                    React.createElement("img", { src: bagIcon, alt: "department icon" }),
                    React.createElement("span", null, department)),
                React.createElement("div", { className: "employee-room" },
                    React.createElement("img", { src: doorIcon, alt: "room icon" }),
                    React.createElement("span", null, room))))));
};
export default EmployeeCard;
