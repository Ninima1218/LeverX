import React, { createContext, useContext, useState } from "react";
import { Role } from "../../server/src/server-types";
import { User } from "../../server/src/server-types";

type AuthState = { userId: string | number | null; role: Role | null };
type AuthCtx = {
  auth: AuthState;
  setAuth: (userId: string | number, role: Role) => void;
  user: User | null;
  clearAuth: () => void;
};

const AuthContext = createContext<AuthCtx | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuthState] = useState<AuthState>(() => {
    const raw = localStorage.getItem("auth_state");
    return raw ? JSON.parse(raw) : { userId: null, role: null };
  });

  const setAuth = (userId: string | number, role: Role) => {
    const next = { userId, role };
    localStorage.setItem("auth_state", JSON.stringify(next));
    setAuthState(next);
  };

  const clearAuth = () => {
    localStorage.removeItem("auth_state");
    setAuthState({ userId: null, role: null });
  };

  return <AuthContext.Provider value={{ auth, setAuth, clearAuth }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
