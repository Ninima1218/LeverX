import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { SignInResponse } from "../../server/src/server-types";

const SignIn: React.FC = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false); const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setError("");
    try {
      const res = await fetch("/api/sign-in", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: email.trim(), password }) });
      const data: SignInResponse = await res.json();
      if (!res.ok || !data.success || !data.user?.id) {
        setError(data.message || "Sign-in failed"); return;
      }
      setAuth(data.user.id, data.user.role || "Employee");
      if (!remember) { /* optional: store in session */ }
      navigate("/");
    } catch { setError("Server unavailable"); }
  };

  return (
    <main className="main-content">
      <div className="content-wrapper">
        <section className="signin-section">
          <h2>Sign In</h2>
          <form className="signin-form" onSubmit={submit}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" className="text-input" placeholder="john.smith@leverx.com" required value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" className="text-input" placeholder="Enter password" required value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="input-wrapper checkbox-wrapper">
              <input id="remember" type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
              <label htmlFor="remember">Remember me</label>
            </div>
            <button type="submit" className="signin-btn">Sign In</button>
            {error && <p id="error" className="error-message">{error}</p>}
          </form>
          <p className="signup-link">Don’t have an account? <Link to="/sign-up">Sign Up</Link></p>
        </section>
      </div>
    </main>
  );
};
export default SignIn;
