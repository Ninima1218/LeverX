import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "./store";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import UserDetails from "./pages/UserDetails";
import AddressBook from "./pages/AddressBook";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const userId = useAppSelector(state => state.auth.userId);
  return userId ? children : <Navigate to="/sign-in" replace />;
};

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const role = useAppSelector(state => state.auth.role);
  return role === "Admin" ? children : <Navigate to="/home" replace />;
};

export default function App() {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />

      <Route path="/address-book" element={<PrivateRoute><AddressBook /></PrivateRoute>} />

      <Route path="/users/:id" element={<PrivateRoute><UserDetails /></PrivateRoute>} />

      <Route path="/settings" element={
        <PrivateRoute>
          <AdminRoute>
            <Settings />
          </AdminRoute>
        </PrivateRoute>
      } />

      <Route path="*" element={<Navigate to="/sign-in" replace />} />
    </Routes>
  );
}