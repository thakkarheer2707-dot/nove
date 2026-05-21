"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type User = {
    name: string;
    email: string;
    isGuest?: boolean;
};

type AuthContextType = {
    user: User | null;
    login: (userData: User) => void;
    loginAsGuest: () => void;
    logout: () => void;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

  // Initialize session from client side (localStorage)
  useEffect(() => {
        const savedUser = localStorage.getItem("nove_user");
        if (savedUser) {
                try {
                          setUser(JSON.parse(savedUser));
                } catch (e) {
                          console.error("Failed to parse saved user session");
                          localStorage.removeItem("nove_user");
                }
        }
        setLoading(false);
  }, []);

  const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem("nove_user", JSON.stringify(userData));
  };

  const loginAsGuest = () => {
        const randomId = Math.random().toString(36).substring(2, 9);
        const guestUser: User = {
                name: "Guest",
                email: `guest_${randomId}@nove.in`,
                isGuest: true
        };
        setUser(guestUser);
        localStorage.setItem("nove_user", JSON.stringify(guestUser));
  };

  const logout = () => {
        setUser(null);
        localStorage.removeItem("nove_user");
  };

  return (
        <AuthContext.Provider value={{ user, login, loginAsGuest, logout, loading }}>
          {children}
        </AuthContext.Provider>
      );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
