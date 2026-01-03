import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch } from "../store";
import { setAuth } from "../store/authSlice";
import { useLoginMutation } from "../store/usersApi"; 

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login({ 
        email: email.trim(), 
        password 
      }).unwrap();

      dispatch(setAuth({
        userId: String(response.user._id),
        role: response.user.role,
        user: response.user
      }));

      navigate("/", { replace: true });
    } catch (err: any) {
      setError(err?.data?.message || "Server unavailable");
    }
  };

  return (
    <main className="main-content">
      <div className="content-wrapper">
        <section className="signin-section">
          <div className="auth-wrapper">
            <h2>Sign In</h2>
            <form className="auth-form" onSubmit={submit}>
              <div className="input-wrapper">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="username"
                  className="text-input"
                  placeholder="john.smith@leverx.com"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  className="text-input"
                  placeholder="Enter password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="input-wrapper checkbox-wrapper">
                <input
                  id="remember"
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <button 
                type="submit" 
                className="btn btn-auth" 
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
              {error && <p id="error" className="error-message">{error}</p>}
            </form>
            <p className="auth-link">
              Don’t have an account? <Link to="/sign-up">Sign Up</Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SignIn;