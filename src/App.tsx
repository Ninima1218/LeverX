import React from "react";
import { Routes, Route, Link } from "react-router-dom";

const Home = () => <h1>Home OK</h1>;
const SignIn = () => <h1>Sign In OK</h1>;
const SignUp = () => <h1>Sign Up OK</h1>;

const App: React.FC = () => {
  return (
    <>
      <nav style={{ padding: 12 }}>
        <Link to="/">Home</Link> | <Link to="/sign-in">Sign In</Link> | <Link to="/sign-up">Sign Up</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default App;
