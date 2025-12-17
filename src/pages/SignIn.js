import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch } from "../store";
import { setAuth } from "../store/authSlice";
const SignIn = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState("");
    const submit = async (e) => {
        var _a;
        e.preventDefault();
        setError("");
        try {
            const res = await fetch("http://localhost:3001/api/sign-in", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.trim(), password })
            });
            const data = await res.json();
            if (!res.ok || !data.success || !((_a = data.user) === null || _a === void 0 ? void 0 : _a._id)) {
                setError(data.message || "Sign-in failed");
                return;
            }
            if (remember) {
                localStorage.setItem("userId", String(data.user._id));
            }
            dispatch(setAuth({
                userId: String(data.user._id),
                role: data.user.role,
                user: data.user
            }));
            navigate("/home", { replace: true });
        }
        catch {
            setError("Server unavailable");
        }
    };
    return (React.createElement("main", { className: "main-content" },
        React.createElement("div", { className: "content-wrapper" },
            React.createElement("section", { className: "signin-section" },
                React.createElement("div", { className: "auth-wrapper" },
                    React.createElement("h2", null, "Sign In"),
                    React.createElement("form", { className: "auth-form", onSubmit: submit },
                        React.createElement("div", { className: "input-wrapper" },
                            React.createElement("label", { htmlFor: "email" }, "Email"),
                            React.createElement("input", { id: "email", type: "email", className: "text-input", placeholder: "john.smith@leverx.com", required: true, value: email, onChange: e => setEmail(e.target.value) })),
                        React.createElement("div", { className: "input-wrapper" },
                            React.createElement("label", { htmlFor: "password" }, "Password"),
                            React.createElement("input", { id: "password", type: "password", autoComplete: "current-password", className: "text-input", placeholder: "Enter password", required: true, value: password, onChange: e => setPassword(e.target.value) })),
                        React.createElement("div", { className: "input-wrapper checkbox-wrapper" },
                            React.createElement("input", { id: "remember", type: "checkbox", checked: remember, onChange: e => setRemember(e.target.checked) }),
                            React.createElement("label", { htmlFor: "remember" }, "Remember me")),
                        React.createElement("button", { type: "submit", className: "btn btn-auth" }, "Sign In"),
                        error && React.createElement("p", { id: "error", className: "error-message" }, error)),
                    React.createElement("p", { className: "auth-link" },
                        "Don\u2019t have an account? ",
                        React.createElement(Link, { to: "/sign-up" }, "Sign Up")))))));
};
export default SignIn;
