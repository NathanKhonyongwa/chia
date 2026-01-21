/**
 * useDatabase Hook
 * React hook for database operations
 */

"use client";

import { useState, useCallback, useEffect } from "react";
import db from "@/lib/db";

export function useDatabase(key, defaultValue = null) {
  const [data, setData] = useState(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const loadedData = await db.load(key, defaultValue);
        setData(loadedData);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [key, defaultValue]);

  // Save data
  const saveData = useCallback(
    async (newData) => {
      try {
        setLoading(true);
        const success = await db.save(key, newData);
        if (success) {
          setData(newData);
          setError(null);
        } else {
          throw new Error("Failed to save data");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error saving data:", err);
      } finally {
        setLoading(false);
      }
    },
    [key]
  );

  // Delete data
  const deleteData = useCallback(async () => {
    try {
      setLoading(true);
      const success = await db.delete(key);
      if (success) {
        setData(defaultValue);
        setError(null);
      } else {
        throw new Error("Failed to delete data");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error deleting data:", err);
    } finally {
      setLoading(false);
    }
  }, [key, defaultValue]);

  // Refresh data
  const refreshData = useCallback(async () => {
    try {
      setLoading(true);
      const loadedData = await db.load(key, defaultValue);
      setData(loadedData);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error refreshing data:", err);
    } finally {
      setLoading(false);
    }
  }, [key, defaultValue]);

  return {
    data,
    setData,
    loading,
    error,
    saveData,
    deleteData,
    refreshData,
  };
}

/**
 * useBackup Hook
 * React hook for backup operations
 */
export function useBackup() {
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [error, setError] = useState(null);
  const [lastBackup, setLastBackup] = useState(null);

  const createBackup = useCallback(async () => {
    try {
      setIsBackingUp(true);
      const blob = await db.backupToFile();

      // Trigger download
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `backup-${new Date().toISOString()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setLastBackup(new Date());
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error creating backup:", err);
    } finally {
      setIsBackingUp(false);
    }
  }, []);

  const restoreBackup = useCallback(async (file) => {
    try {
      setIsRestoring(true);
      const success = await db.restoreFromFile(file);
      if (success) {
        setError(null);
      } else {
        throw new Error("Failed to restore backup");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error restoring backup:", err);
    } finally {
      setIsRestoring(false);
    }
  }, []);

  return {
    createBackup,
    restoreBackup,
    isBackingUp,
    isRestoring,
    error,
    lastBackup,
  };
}

/**
 * useDatabaseStats Hook
 * React hook for database statistics
 */
export function useDatabaseStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const dbStats = await db.getStatistics();
        setStats(dbStats);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error loading statistics:", err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return { stats, loading, error };
}
