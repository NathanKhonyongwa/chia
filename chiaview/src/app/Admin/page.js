"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/useToast";
import AdminDashboard from "@/components/AdminDashboard";

export default function AdminPage() {
  const router = useRouter();
  const { admin, logout } = useAuth();
  const { showToast } = useToast() || {};

  useEffect(() => {
    if (!admin) {
      router.push("/Register");
      if (showToast) {
        showToast("Please log in first", "error");
      }
    }
  }, [admin, router, showToast]);

  const handleLogout = () => {
    logout();
    if (showToast) {
      showToast("Logged out successfully", "success");
    }
    router.push("/");
  };

  if (!admin) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
}
