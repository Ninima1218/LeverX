import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useAppSelector } from "../store";
import { useGetUserByIdQuery, useUpdateUserMutation } from "../store/usersApi";
const canEditByRole = (current, target) => {
    var _a, _b;
    if (!current || !target)
        return false;
    if (current.role === "Admin")
        return current._id !== target._id;
    if (current.role === "HR") {
        const mgrId = (_b = (_a = target.manager) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : target.manager_id;
        return current._id !== target._id && String(mgrId) === String(current._id);
    }
    return false;
};
const UserDetails = () => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const { id } = useParams();
    const auth = useAppSelector(state => state.auth);
    const { data: user, isLoading, error } = useGetUserByIdQuery(id, { skip: !id });
    const current = auth.user;
    const [edit, setEdit] = useState(false);
    const [form, setForm] = useState({});
    const [updateUser] = useUpdateUserMutation();
    const canEdit = useMemo(() => canEditByRole(current, user || null), [current, user]);
    const startEdit = () => {
        if (!user)
            return;
        setEdit(true);
        setForm({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone,
            telegram: user.telegram,
            citizenship: user.citizenship,
            department: user.department,
            building: user.building,
            room: user.room,
            desk_number: user.desk_number,
            visa: user.visa
        });
    };
    const save = async () => {
        if (!user)
            return;
        await updateUser({ id: user._id, data: form });
        setEdit(false);
    };
    if (isLoading)
        return React.createElement("p", null, "Loading user...");
    if (error || !user) {
        return (React.createElement(React.Fragment, null,
            React.createElement(Header, null),
            React.createElement("main", { className: "main-content" },
                React.createElement("div", { className: "content-wrapper" },
                    React.createElement("h2", null, "Nothing found")))));
    }
    const avatarSrc = user.user_avatar
        ? `/assets/avatars/${user.user_avatar}`
        : "/assets/avatars/profile-avatar.webp";
    return (React.createElement(React.Fragment, null,
        React.createElement(Header, null),
        React.createElement("main", { className: "main-content" },
            React.createElement("div", { className: "content-wrapper" },
                React.createElement("section", { className: "user-details" },
                    React.createElement("div", { className: "user-layout" },
                        React.createElement("div", { className: "user-left" },
                            React.createElement("img", { src: avatarSrc, alt: `${user.first_name}`, className: "profile-avatar" }),
                            React.createElement("h2", { className: "full-name" },
                                user.first_name,
                                " ",
                                user.last_name),
                            canEdit && (React.createElement("div", { className: "profile-actions" },
                                !edit && (React.createElement("button", { className: "edit-btn", onClick: startEdit },
                                    React.createElement("img", { src: require("../assets/icons/pen.svg"), className: "edit-icon", alt: "edit" }),
                                    " Edit")),
                                edit && (React.createElement(React.Fragment, null,
                                    React.createElement("button", { className: "save-btn", onClick: save }, "Save"),
                                    React.createElement("button", { className: "cancel-btn", onClick: () => setEdit(false) }, "Cancel")))))),
                        React.createElement("div", { className: "user-right" },
                            React.createElement("div", { className: "details-columns" },
                                React.createElement("div", { className: "block general" },
                                    React.createElement("h3", { className: "section-title" }, "General Info"),
                                    React.createElement("ul", null,
                                        React.createElement("li", null,
                                            React.createElement("strong", null, "Department:"),
                                            React.createElement("span", { className: "value" }, edit ? React.createElement("input", { value: form.department || "", onChange: e => setForm({ ...form, department: e.target.value }) }) : ((_a = user.department) !== null && _a !== void 0 ? _a : "-"))),
                                        React.createElement("li", null,
                                            React.createElement("strong", null, "Building:"),
                                            React.createElement("span", { className: "value" }, edit ? React.createElement("input", { value: form.building || "", onChange: e => setForm({ ...form, building: e.target.value }) }) : ((_b = user.building) !== null && _b !== void 0 ? _b : "-"))),
                                        React.createElement("li", null,
                                            React.createElement("strong", null, "Room:"),
                                            React.createElement("span", { className: "value" }, edit ? React.createElement("input", { value: form.room || "", onChange: e => setForm({ ...form, room: e.target.value }) }) : ((_c = user.room) !== null && _c !== void 0 ? _c : "-"))),
                                        React.createElement("li", null,
                                            React.createElement("strong", null, "Desk number:"),
                                            React.createElement("span", { className: "value" }, edit ? React.createElement("input", { value: String((_d = form.desk_number) !== null && _d !== void 0 ? _d : ""), onChange: e => setForm({ ...form, desk_number: e.target.value }) }) : ((_e = user.desk_number) !== null && _e !== void 0 ? _e : "-"))))),
                                React.createElement("div", { className: "block contacts" },
                                    React.createElement("h3", { className: "section-title" }, " Contacts"),
                                    React.createElement("ul", null,
                                        React.createElement("li", null,
                                            React.createElement("strong", null, "Mobile phone:"),
                                            React.createElement("span", { className: "value" }, edit ? React.createElement("input", { value: form.phone || "", onChange: e => setForm({ ...form, phone: e.target.value }) }) : ((_f = user.phone) !== null && _f !== void 0 ? _f : "-"))),
                                        React.createElement("li", null,
                                            React.createElement("strong", null, "Email:"),
                                            React.createElement("span", { className: "value" }, edit ? React.createElement("input", { value: form.email || "", onChange: e => setForm({ ...form, email: e.target.value }) }) : ((_g = user.email) !== null && _g !== void 0 ? _g : "-"))),
                                        React.createElement("li", null,
                                            React.createElement("strong", null, "Telegram:"),
                                            React.createElement("span", { className: "value" }, edit ? React.createElement("input", { value: form.telegram || "", onChange: e => setForm({ ...form, telegram: e.target.value }) }) : ((_h = user.telegram) !== null && _h !== void 0 ? _h : "-"))))),
                                React.createElement("div", { className: "block travel" },
                                    React.createElement("h3", { className: "section-title" }, "Travel Info"),
                                    React.createElement("ul", null,
                                        React.createElement("li", null,
                                            React.createElement("strong", null, "Citizenship:"),
                                            React.createElement("span", { className: "value" }, edit ? React.createElement("input", { value: form.citizenship || "", onChange: e => setForm({ ...form, citizenship: e.target.value }) }) : ((_j = user.citizenship) !== null && _j !== void 0 ? _j : "-"))),
                                        React.createElement("li", null,
                                            React.createElement("strong", null, "Visa:"),
                                            React.createElement("span", { className: "value" }, edit ? (React.createElement("input", { value: form.visa ? String(form.visa) : "", onChange: e => setForm({ ...form, visa: e.target.value }) })) : (Array.isArray(user.visa)
                                                ? user.visa.map(v => `${v.type} (${v.issuing_country})`).join(", ")
                                                : (_k = user.visa) !== null && _k !== void 0 ? _k : "-")))))))))))));
};
export default UserDetails;
