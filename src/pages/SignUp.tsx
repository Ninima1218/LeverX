import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password, role: "Employee" })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Sign-up failed");
        return;
      }

      navigate("/sign-in", { replace: true });
    } catch {
      setError("Server unavailable");
    }
  };

  return (
    <main className="main-content">
      <div className="content-wrapper">
        <section className="signup-section">
          <h2>Create Account</h2>
          <form className="signup-form" onSubmit={submit}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="text-input"
                placeholder="john.smith@leverx.com"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              {error.includes("email") && <p className="field-error">{error}</p>}
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="text-input"
                placeholder="Enter password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              {error.toLowerCase().includes("password") && (
                <p className="field-error">{error}</p>
              )}
            </div>
            <div className="input-wrapper">
              <label htmlFor="confirm">Confirm Password</label>
              <input
                id="confirm"
                type="password"
                className="text-input"
                placeholder="Confirm password"
                required
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
              />
              {error.toLowerCase().includes("match") && (
                <p className="field-error">{error}</p>
              )}
            </div>
            <button type="submit" className="signup-btn">Sign Up</button>
            {error && <p id="error" className="error-message">{error}</p>}
          </form>
          <p className="signin-link">
            Already have an account? <Link to="/sign-in">Sign In</Link>
          </p>
        </section>
      </div>
    </main>
  );
};

export default SignUp;
