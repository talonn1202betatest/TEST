import { createContext, useContext, useMemo, useState } from "react";
import { request } from "../api.js";

const STORAGE_KEY = "auth";
const AuthContext = createContext(null);

const loadAuth = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(loadAuth);

  const value = useMemo(() => {
    const login = async (username, password) => {
      const data = await request("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, expiresInMins: 60 }),
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setAuth(data);
    };

    const logout = () => {
      localStorage.removeItem(STORAGE_KEY);
      setAuth(null);
    };

    return {
      user: auth,
      token: auth?.accessToken ?? null,
      isAuthenticated: Boolean(auth?.accessToken),
      login,
      logout,
    };
  }, [auth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth phải nằm trong AuthProvider");
  return context;
};
