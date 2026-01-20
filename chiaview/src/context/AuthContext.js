// src/context/AuthContext.js
"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load admin from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("admin_user");
      if (stored) {
        setAdmin(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading admin:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (email, password, name) => {
    // Simple demo authentication (in production, call backend API)
    const adminUser = { email, name, id: Date.now() };
    localStorage.setItem("admin_user", JSON.stringify(adminUser));
    setAdmin(adminUser);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("admin_user");
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
