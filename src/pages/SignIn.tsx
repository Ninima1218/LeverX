import React from "react";
import Header from "../components/Header";

const SignIn: React.FC = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        <div className="content-wrapper">
          <section className="signin-section">
            <h2>Sign In</h2>
            <form className="signin-form">
              <div className="input-wrapper">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="text-input"
                  placeholder="john.smith@leverx.com"
                  required
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="text-input"
                  placeholder="Enter password"
                  required
                />
              </div>
              <div className="input-wrapper checkbox-wrapper">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <button type="submit" className="signin-btn">Sign In</button>
              <p id="error" className="error-message"></p>
            </form>
            <p className="signup-link">
              Don’t have an account? <a href="/sign-up">Sign Up</a>
            </p>
          </section>
        </div>
      </main>
    </>
  );
};

export default SignIn;
