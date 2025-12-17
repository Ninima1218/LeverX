import React, { useMemo, useState } from "react";
import Header from "../components/Header";
import { useAppSelector } from "../store";
import { useGetUsersQuery, useGetUserByIdQuery, useUpdateUserMutation } from "../store/usersApi";
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
const Settings = () => {
    const auth = useAppSelector(state => state.auth);
    const { data: users = [], isLoading, error } = useGetUsersQuery();
    const { data: current } = useGetUserByIdQuery(auth.userId, { skip: !auth.userId });
    const [updateUser] = useUpdateUserMutation();
    const [term, setTerm] = useState("");
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({});
    const filtered = useMemo(() => {
        const t = term.toLowerCase();
        return users.filter(u => {
            var _a, _b, _c;
            return ((_a = u.first_name) !== null && _a !== void 0 ? _a : "").toLowerCase().includes(t) ||
                ((_b = u.last_name) !== null && _b !== void 0 ? _b : "").toLowerCase().includes(t) ||
                ((_c = u.email) !== null && _c !== void 0 ? _c : "").toLowerCase().includes(t);
        });
    }, [term, users]);
    const startEdit = (u) => {
        if (!current || !canEdit(current, u))
            return;
        setEditing(u);
        setForm({
            first_name: u.first_name,
            last_name: u.last_name,
            first_native_name: u.first_native_name,
            last_native_name: u.last_native_name,
            middle_native_name: u.middle_native_name,
            email: u.email,
            phone: u.phone,
            telegram: u.telegram,
            citizenship: u.citizenship,
            role: u.role
        });
    };
    const submit = async (e) => {
        e.preventDefault();
        if (!editing)
            return;
        await updateUser({ id: editing._id, data: form });
        setEditing(null);
    };
    if (isLoading)
        return React.createElement("p", null, "Loading users...");
    if (error)
        return React.createElement("p", null, "Error loading users");
    return (React.createElement(React.Fragment, null,
        React.createElement(Header, null),
        React.createElement("main", { className: "main-content" },
            React.createElement("div", { className: "content-wrapper" },
                React.createElement("h2", null, "Roles & Permissions"),
                React.createElement("input", { id: "search", placeholder: "Search", value: term, onChange: e => setTerm(e.target.value) }),
                React.createElement("table", { id: "roles-table" },
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", null, "Name"),
                            React.createElement("th", null, "Email"),
                            React.createElement("th", null, "Role"),
                            React.createElement("th", null, "Actions"))),
                    React.createElement("tbody", null, filtered.map(u => {
                        var _a;
                        return (React.createElement("tr", { key: u._id },
                            React.createElement("td", null,
                                u.first_name,
                                " ",
                                u.last_name),
                            React.createElement("td", null, (_a = u.email) !== null && _a !== void 0 ? _a : ""),
                            React.createElement("td", null, u.role),
                            React.createElement("td", null, current && canEdit(current, u) && (React.createElement("button", { className: "edit-btn", onClick: () => startEdit(u) }, "Edit")))));
                    }))),
                editing && (React.createElement("div", { id: "edit-modal" },
                    React.createElement("form", { id: "edit-form", onSubmit: submit },
                        React.createElement("input", { name: "first_name", value: form.first_name || "", onChange: e => setForm({ ...form, first_name: e.target.value }) }),
                        React.createElement("input", { name: "last_name", value: form.last_name || "", onChange: e => setForm({ ...form, last_name: e.target.value }) }),
                        React.createElement("input", { name: "email", value: form.email || "", onChange: e => setForm({ ...form, email: e.target.value }) }),
                        React.createElement("select", { name: "role", value: form.role || "Employee", onChange: e => setForm({ ...form, role: e.target.value }) },
                            React.createElement("option", null, "Admin"),
                            React.createElement("option", null, "HR"),
                            React.createElement("option", null, "Employee")),
                        React.createElement("button", { type: "submit" }, "Save"),
                        React.createElement("button", { type: "button", id: "cancel-edit", onClick: () => setEditing(null) }, "Cancel"))))))));
};
export default Settings;
