import React, { useMemo, useState } from "react";
import { useGetUsersQuery } from "../store/usersApi";
import { useAppSelector } from "../store";
const canEdit = (current, target) => {
    var _a, _b;
    if (current.role === "Admin")
        return String(current._id) !== String(target._id);
    if (current.role === "HR") {
        const managerId = (_b = (_a = target.manager) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : target.manager_id;
        return String(current._id) !== String(target._id) && String(managerId) === String(current._id);
    }
    return false;
};
const EmployeeTable = () => {
    const auth = useAppSelector(s => s.auth);
    const { data: users = [], isLoading, error } = useGetUsersQuery();
    const filter = useAppSelector(s => s.filter);
    const [term, setTerm] = useState("");
    const filtered = useMemo(() => {
        const t = term.trim().toLowerCase();
        const byForm = (u) => Object.entries(filter).every(([key, val]) => {
            if (!val)
                return true;
            const field = u[key];
            return field && String(field).toLowerCase().includes(String(val).toLowerCase());
        });
        return users
            .filter(u => byForm(u))
            .filter(u => {
            var _a, _b, _c;
            if (!t)
                return true;
            const full = `${(_a = u.first_name) !== null && _a !== void 0 ? _a : ""} ${(_b = u.last_name) !== null && _b !== void 0 ? _b : ""}`.toLowerCase();
            return full.includes(t) || ((_c = u.email) !== null && _c !== void 0 ? _c : "").toLowerCase().includes(t);
        });
    }, [users, filter, term]);
    if (isLoading)
        return React.createElement("p", null, "Loading employees...");
    if (error)
        return React.createElement("p", null, "Error loading users");
    return (React.createElement("section", { className: "address-book" },
        React.createElement("div", { className: "table-header" },
            React.createElement("h2", null, "Address Book"),
            React.createElement("input", { className: "search-input", placeholder: "Search employees", value: term, onChange: e => setTerm(e.target.value) })),
        React.createElement("table", { className: "employees-table" },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null, "Avatar"),
                    React.createElement("th", null, "Name"),
                    React.createElement("th", null, "Email"),
                    React.createElement("th", null, "Department"),
                    React.createElement("th", null, "Building"),
                    React.createElement("th", null, "Room"),
                    React.createElement("th", null, "Actions"))),
            React.createElement("tbody", null, filtered.map(u => {
                var _a, _b, _c, _d;
                const avatarSrc = u.user_avatar
                    ? `/assets/avatars/${u.user_avatar}`
                    : "/assets/avatars/profile-avatar.webp";
                const can = auth.user && canEdit(auth.user, u);
                return (React.createElement("tr", { key: u._id },
                    React.createElement("td", null,
                        React.createElement("img", { src: avatarSrc, alt: "avatar", className: "table-avatar" })),
                    React.createElement("td", null,
                        u.first_name,
                        " ",
                        u.last_name),
                    React.createElement("td", null, (_a = u.email) !== null && _a !== void 0 ? _a : ""),
                    React.createElement("td", null, (_b = u.department) !== null && _b !== void 0 ? _b : ""),
                    React.createElement("td", null, (_c = u.building) !== null && _c !== void 0 ? _c : ""),
                    React.createElement("td", null, (_d = u.room) !== null && _d !== void 0 ? _d : ""),
                    React.createElement("td", null, can ? React.createElement("a", { className: "edit-link", href: `/users/${u._id}` }, "Edit") : "")));
            })))));
};
export default EmployeeTable;
