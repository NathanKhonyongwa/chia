/**
 * Database Service Layer
 * Abstraction for database operations
 * Easily switch between localStorage, Firebase, or backend API
 */

"use client";

/**
 * Database Service Interface
 * All database operations go through this service
 */

class DatabaseService {
  constructor(provider = "localStorage") {
    this.provider = provider;
  }

  /**
   * Save data to database
   * @param {string} key - Data collection key
   * @param {object|array} data - Data to save
   * @returns {Promise<boolean>}
   */
  async save(key, data) {
    try {
      if (this.provider === "localStorage") {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
      } else if (this.provider === "api") {
        const response = await fetch(`/api/data/${key}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        return response.ok;
      }
    } catch (error) {
      console.error(`Error saving data to ${key}:`, error);
      return false;
    }
  }

  /**
   * Load data from database
   * @param {string} key - Data collection key
   * @param {*} defaultValue - Default value if not found
   * @returns {Promise<object|array>}
   */
  async load(key, defaultValue = null) {
    try {
      if (this.provider === "localStorage") {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
      } else if (this.provider === "api") {
        const response = await fetch(`/api/data/${key}`);
        if (response.ok) {
          return await response.json();
        }
        return defaultValue;
      }
    } catch (error) {
      console.error(`Error loading data from ${key}:`, error);
      return defaultValue;
    }
  }

  /**
   * Delete data from database
   * @param {string} key - Data collection key
   * @returns {Promise<boolean>}
   */
  async delete(key) {
    try {
      if (this.provider === "localStorage") {
        localStorage.removeItem(key);
        return true;
      } else if (this.provider === "api") {
        const response = await fetch(`/api/data/${key}`, {
          method: "DELETE",
        });
        return response.ok;
      }
    } catch (error) {
      console.error(`Error deleting data from ${key}:`, error);
      return false;
    }
  }

  /**
   * Clear all data
   * @returns {Promise<boolean>}
   */
  async clear() {
    try {
      if (this.provider === "localStorage") {
        localStorage.clear();
        return true;
      } else if (this.provider === "api") {
        const response = await fetch("/api/data/clear", {
          method: "POST",
        });
        return response.ok;
      }
    } catch (error) {
      console.error("Error clearing data:", error);
      return false;
    }
  }

  /**
   * Export all data
   * @returns {Promise<object>}
   */
  async exportData() {
    try {
      if (this.provider === "localStorage") {
        const data = {};
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          data[key] = JSON.parse(localStorage.getItem(key));
        }
        return data;
      } else if (this.provider === "api") {
        const response = await fetch("/api/data/export");
        if (response.ok) {
          return await response.json();
        }
      }
    } catch (error) {
      console.error("Error exporting data:", error);
      return {};
    }
  }

  /**
   * Import data
   * @param {object} data - Data to import
   * @returns {Promise<boolean>}
   */
  async importData(data) {
    try {
      if (this.provider === "localStorage") {
        Object.entries(data).forEach(([key, value]) => {
          localStorage.setItem(key, JSON.stringify(value));
        });
        return true;
      } else if (this.provider === "api") {
        const response = await fetch("/api/data/import", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        return response.ok;
      }
    } catch (error) {
      console.error("Error importing data:", error);
      return false;
    }
  }

  /**
   * Backup data to file
   * @returns {Promise<Blob>}
   */
  async backupToFile() {
    const data = await this.exportData();
    const jsonString = JSON.stringify(data, null, 2);
    return new Blob([jsonString], { type: "application/json" });
  }

  /**
   * Restore from backup file
   * @param {File} file - Backup file
   * @returns {Promise<boolean>}
   */
  async restoreFromFile(file) {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      return await this.importData(data);
    } catch (error) {
      console.error("Error restoring from file:", error);
      return false;
    }
  }

  /**
   * Validate data
   * @param {string} key - Data collection key
   * @returns {Promise<{isValid: boolean, errors: array}>}
   */
  async validateData(key) {
    try {
      const data = await this.load(key);
      const errors = [];

      // Basic validation rules
      if (!data) {
        errors.push("Data not found");
      }

      // You can add more specific validation based on data type
      return {
        isValid: errors.length === 0,
        errors,
      };
    } catch (error) {
      return {
        isValid: false,
        errors: [error.message],
      };
    }
  }

  /**
   * Get database statistics
   * @returns {Promise<object>}
   */
  async getStatistics() {
    try {
      const stats = {
        provider: this.provider,
        timestamp: new Date().toISOString(),
      };

      if (this.provider === "localStorage") {
        stats.totalItems = localStorage.length;
        stats.totalSize = Object.values(localStorage).reduce(
          (acc, item) => acc + item.length,
          0
        );
        stats.keys = [];
        for (let i = 0; i < localStorage.length; i++) {
          stats.keys.push(localStorage.key(i));
        }
      }

      return stats;
    } catch (error) {
      console.error("Error getting statistics:", error);
      return {};
    }
  }
}

// Create singleton instance
const db = new DatabaseService(process.env.NEXT_PUBLIC_DB_PROVIDER || "localStorage");

export default db;
export { DatabaseService };
