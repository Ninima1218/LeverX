import React from "react";
import Header from "../components/Header";

const SignUp: React.FC = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        <div className="content-wrapper">
          <section className="signup-section">
            <h2>Create Account</h2>
            <form className="signup-form">
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
              <div className="input-wrapper">
                <label htmlFor="confirm">Confirm Password</label>
                <input
                  type="password"
                  id="confirm"
                  className="text-input"
                  placeholder="Confirm password"
                  required
                />
              </div>
              <button type="submit" className="signup-btn">Sign Up</button>
              <p id="error" className="error-message"></p>
            </form>
            <p className="signin-link">
              Already have an account? <a href="/sign-in">Sign In</a>
            </p>
          </section>
        </div>
      </main>
    </>
  );
};

export default SignUp;
