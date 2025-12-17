import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store";
import { clearAuth } from "../store/authSlice";
const Header = () => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen(v => !v);
    const close = () => setOpen(false);
    const auth = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (!open)
            return;
        const onClick = () => setOpen(false);
        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, [open]);
    const signOut = () => {
        dispatch(clearAuth());
        navigate("/sign-in", { replace: true });
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("header", { className: "header" },
            React.createElement(Link, { to: "/home", className: "header__left" },
                React.createElement("h3", null, "LEVERX"),
                React.createElement("h1", null, "EMPLOYEE SERVICES")),
            React.createElement("div", { className: "header__center" },
                React.createElement("div", { className: "address-book-title" },
                    React.createElement(Link, { to: "/address-book", className: "address-link" }, "Address Book"),
                    auth.role === "Admin" && (React.createElement(Link, { className: "settings-link", to: "/settings" }, "Settings")))),
            React.createElement("div", { className: "header__right" },
                React.createElement("button", { className: "support-btn" },
                    React.createElement("img", { src: require("../assets/icons/support.svg"), alt: "support", className: "support-icon" }),
                    "Support"),
                React.createElement("div", { className: "user-info" },
                    React.createElement("img", { className: "user-avatar", src: ((_a = auth.user) === null || _a === void 0 ? void 0 : _a.user_avatar)
                            ? `/assets/avatars/${auth.user.user_avatar}`
                            : "/assets/avatars/profile-avatar.webp", alt: "avatar" }),
                    React.createElement("span", { className: "user-name" }, (_c = (_b = auth.user) === null || _b === void 0 ? void 0 : _b.first_name) !== null && _c !== void 0 ? _c : "User")),
                React.createElement("button", { className: "signout-btn", onClick: signOut },
                    React.createElement("img", { className: "signout-icon", src: require("../assets/icons/signout.svg"), alt: "sign out" }))),
            React.createElement("button", { className: "burger-btn", onClick: e => {
                    e.stopPropagation();
                    toggle();
                } },
                React.createElement("img", { src: require("../assets/icons/menu.svg"), alt: "menu" }))),
        React.createElement("nav", { className: `menu--mobile ${open ? "open" : ""}`, onClick: e => e.stopPropagation() },
            React.createElement("div", { className: "menu-header" },
                React.createElement("button", { className: "close-btn", onClick: close }, "\u00D7")),
            React.createElement("div", { className: "user-info" },
                React.createElement("img", { className: "user-avatar", src: ((_d = auth.user) === null || _d === void 0 ? void 0 : _d.user_avatar)
                        ? `/assets/avatars/${auth.user.user_avatar}`
                        : "/assets/avatars/profile-avatar.webp", alt: "avatar" }),
                React.createElement("span", { className: "user-name" }, (_f = (_e = auth.user) === null || _e === void 0 ? void 0 : _e.first_name) !== null && _f !== void 0 ? _f : "User",
                    " ", (_h = (_g = auth.user) === null || _g === void 0 ? void 0 : _g.last_name) !== null && _h !== void 0 ? _h : "")),
            React.createElement("button", { className: "signout-btn", onClick: signOut },
                React.createElement("img", { className: "signout-icon", src: require("../assets/icons/signout.svg"), alt: "sign out" }),
                "Sign Out"),
            React.createElement(Link, { className: "menu-link", to: "/address-book" }, "Address Book"),
            auth.role === "Admin" && (React.createElement(Link, { className: "menu-link", to: "/settings" }, "Settings")),
            React.createElement("div", { className: "menu-footer" },
                React.createElement("button", { className: "support-btn" },
                    React.createElement("img", { src: require("../assets/icons/support.svg"), alt: "support", className: "support-icon" }),
                    "Support")))));
};
export default Header;
