import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { auth } = useAuth();
  if (auth.role !== "Admin") return <Navigate to="/address-book" replace />;
  return <>{children}</>;
};
