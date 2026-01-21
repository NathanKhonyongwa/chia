// src/context/AuthContext.js
"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load admin session from server on mount (httpOnly cookie)
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/admin/me");
        const json = await res.json();
        if (json?.success) {
          setAdmin(json.admin || null);
        } else {
          setAdmin(null);
        }
      } catch (error) {
        console.error("Error loading admin:", error);
        setAdmin(null);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const login = async (email, password) => {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      return { success: false, error: json.error || "Login failed" };
    }
    setAdmin(json.admin);
    return { success: true, admin: json.admin };
  };

  const logout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {}
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
