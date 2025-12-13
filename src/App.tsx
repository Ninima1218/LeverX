// src/App.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import UserDetails from "./pages/UserDetails";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { auth } = useAuth();
  return auth.userId ? children : <Navigate to="/sign-in" replace />;
};

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { auth } = useAuth();
  return auth.role === "Admin" ? children : <Navigate to="/" replace />;
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/users/:id" element={<PrivateRoute><UserDetails /></PrivateRoute>} />
      <Route path="/settings" element={<PrivateRoute><AdminRoute><Settings /></AdminRoute></PrivateRoute>} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
