import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");
    const submit = async (e) => {
        e.preventDefault();
        setError("");
        if (password !== confirm) {
            setError("Passwords do not match");
            return;
        }
        try {
            const res = await fetch("http://localhost:3001/api/sign-up", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.trim(), password })
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                setError(data.message || "Sign-up failed");
                return;
            }
            navigate("/sign-in", { replace: true });
        }
        catch {
            setError("Server unavailable");
        }
    };
    return (React.createElement("main", { className: "main-content" },
        React.createElement("div", { className: "content-wrapper" },
            React.createElement("section", { className: "signup-section" },
                React.createElement("div", { className: "auth-wrapper" },
                    React.createElement("h2", null, "Create Account"),
                    React.createElement("form", { className: "auth-form", onSubmit: submit },
                        React.createElement("div", { className: "input-wrapper" },
                            React.createElement("label", { htmlFor: "email" }, "Email"),
                            React.createElement("input", { id: "email", type: "email", className: "text-input", placeholder: "john.smith@leverx.com", required: true, value: email, onChange: e => setEmail(e.target.value) }),
                            error.includes("email") && React.createElement("p", { className: "field-error" }, error)),
                        React.createElement("div", { className: "input-wrapper" },
                            React.createElement("label", { htmlFor: "password" }, "Password"),
                            React.createElement("input", { id: "password", type: "password", className: "text-input", placeholder: "Enter password", required: true, value: password, onChange: e => setPassword(e.target.value) }),
                            error.toLowerCase().includes("password") && (React.createElement("p", { className: "field-error" }, error))),
                        React.createElement("div", { className: "input-wrapper" },
                            React.createElement("label", { htmlFor: "confirm" }, "Confirm Password"),
                            React.createElement("input", { id: "confirm", type: "password", className: "text-input", placeholder: "Confirm password", required: true, value: confirm, onChange: e => setConfirm(e.target.value) }),
                            error.toLowerCase().includes("match") && (React.createElement("p", { className: "field-error" }, error))),
                        React.createElement("button", { type: "submit", className: "btn btn-auth" }, "Sign Up"),
                        error && React.createElement("p", { id: "error", className: "error-message" }, error)),
                    React.createElement("p", { className: "auth-link" },
                        "Already have an account? ",
                        React.createElement(Link, { to: "/sign-in" }, "Sign In")))))));
};
export default SignUp;
