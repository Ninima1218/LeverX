import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Role } from "../types/User";

type AuthState = {
  userId: string | null;
  role: Role | null;
  user: User | null;
};

const AuthContext = createContext<{
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
} | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({ userId: null, role: null, user: null });

  useEffect(() => {
  const loadUser = async () => {
    const savedId = localStorage.getItem("userId");
    if (!savedId) return;

    try {
      const res = await fetch(`/api/users/${savedId}`);
      if (!res.ok) {
        localStorage.removeItem("userId");
        setAuth({ userId: null, role: null, user: null });
        return;
      }

      const rawUser = await res.json();

      if (!rawUser || !(rawUser.id || rawUser._id)) {
        localStorage.removeItem("userId");
        setAuth({ userId: null, role: null, user: null });
        return;
      }

      const normalizedUser: User = {
          id: String(rawUser.id ?? rawUser._id),
          email: rawUser.email,
          role: rawUser.role,
          user_avatar: rawUser.user_avatar,
          first_name: rawUser.first_name,
          last_name: rawUser.last_name
        };

      setAuth({
        userId: normalizedUser.id,
        role: normalizedUser.role,
        user: normalizedUser
      });
    } catch (err) {
      console.error("Auth bootstrap failed", err);
      localStorage.removeItem("userId");
      setAuth({ userId: null, role: null, user: null });
    }
  };

  loadUser();
}, []);


  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
