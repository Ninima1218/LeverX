import React, { useState } from "react";
import EmployeeCard from "./EmployeeCard";
import { useGetUsersQuery } from "../store/usersApi";
import { useAppSelector } from "../store";
const EmployeeSection = () => {
    const [view, setView] = useState("grid");
    const { data: employees = [], isLoading, error } = useGetUsersQuery();
    const filter = useAppSelector(state => state.filter);
    const filtered = employees.filter(emp => Object.entries(filter).every(([key, val]) => {
        if (!val)
            return true;
        const field = emp[key];
        return field && String(field).toLowerCase().includes(String(val).toLowerCase());
    }));
    if (isLoading)
        return React.createElement("p", null, "Loading employees...");
    if (error)
        return React.createElement("p", null, "Error loading users");
    return (React.createElement("section", { className: "employee-section" },
        React.createElement("div", { className: "employee-toolbar" },
            React.createElement("span", { className: "employee-count" },
                "Employees: ",
                filtered.length),
            React.createElement("div", { className: "view-toggle" },
                React.createElement("button", { className: `view-btn ${view === "grid" ? "active" : ""}`, onClick: () => setView("grid") },
                    React.createElement("img", { src: require("../assets/icons/grid.svg"), alt: "grid" })),
                React.createElement("button", { className: `view-btn ${view === "list" ? "active" : ""}`, onClick: () => setView("list") },
                    React.createElement("img", { src: require("../assets/icons/list.svg"), alt: "list" })))),
        view === "list" && (React.createElement("div", { className: "employee-list-header" },
            React.createElement("span", null, "Avatar"),
            React.createElement("span", null, "Name"),
            React.createElement("span", null, "Department"),
            React.createElement("span", null, "Room"))),
        React.createElement("div", { className: `employee-cards-container ${view}-view` }, filtered.length === 0 ? (React.createElement("div", { className: "nothing-found" },
            React.createElement("div", { className: "title" }, "Nothing found"),
            React.createElement("div", { className: "desc" }, "No result match your search. Try different request."))) : (filtered.map(emp => (React.createElement(EmployeeCard, { key: emp._id, name: `${emp.first_name} ${emp.last_name}`, department: emp.department || "", room: emp.room || "", avatar: emp.user_avatar || "" })))))));
};
export default EmployeeSection;
