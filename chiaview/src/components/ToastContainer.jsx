/**
 * ToastContainer - Displays toast notifications
 * Should be placed at the root of your application
 * 
 * Usage in layout or main component:
 * <ToastProvider>
 *   <YourApp />
 * </ToastProvider>
 */

"use client";

import { createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/useToast";

// Create context for accessing toast functions anywhere in the app
const ToastContext = createContext();

/**
 * Custom hook to access toast functions from anywhere
 * @returns {Object} - Toast utilities
 */
export function useToastContext() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within ToastProvider");
  }
  return context;
}

/**
 * ToastProvider - Wrapper component that provides toast functionality
 */
export function ToastProvider({ children }) {
  const toast = useToast();

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />
    </ToastContext.Provider>
  );
}

/**
 * ToastContainer - Renders individual toast notifications
 */
function ToastContainer({ toasts, onRemove }) {
  const getToastStyles = (type) => {
    const styles = {
      success: "bg-green-500 text-white",
      error: "bg-red-500 text-white",
      info: "bg-blue-500 text-white",
      warning: "bg-yellow-500 text-white",
    };
    return styles[type] || styles.info;
  };

  const getToastIcon = (type) => {
    const icons = {
      success: "✓",
      error: "✕",
      info: "ℹ",
      warning: "⚠",
    };
    return icons[type] || icons.info;
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className={`
              ${getToastStyles(toast.type)}
              px-6 py-4 rounded-lg shadow-2xl pointer-events-auto
              flex items-center gap-3 backdrop-blur-md bg-opacity-90
              max-w-sm border border-white/20
            `}
            role="alert"
            aria-live="polite"
          >
            <span className="text-lg font-bold">{getToastIcon(toast.type)}</span>
            <span className="flex-1">{toast.message}</span>
            <button
              onClick={() => onRemove(toast.id)}
              className="ml-2 text-white/60 hover:text-white transition-colors"
              aria-label="Dismiss notification"
            >
              ✕
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
