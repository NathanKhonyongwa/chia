/**
 * Admin Dashboard - Content management interface
 * Features:
 * - Quick stats overview
 * - Content management shortcuts
 * - Recent activity
 * - System status
 */

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaCalendarAlt,
  FaNewspaper,
  FaComments,
  FaDollarSign,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaCog,
  FaChartLine,
  FaBell
} from "react-icons/fa";
import Link from "next/link";

const statsData = [
  {
    title: "Total Visitors",
    value: "2,847",
    change: "+12.5%",
    changeType: "positive",
    icon: FaUsers,
    color: "blue"
  },
  {
    title: "Events This Month",
    value: "24",
    change: "+8.2%",
    changeType: "positive",
    icon: FaCalendarAlt,
    color: "green"
  },
  {
    title: "Blog Posts",
    value: "156",
    change: "+15.3%",
    changeType: "positive",
    icon: FaNewspaper,
    color: "purple"
  },
  {
    title: "Donations",
    value: "$12,450",
    change: "+22.1%",
    changeType: "positive",
    icon: FaDollarSign,
    color: "yellow"
  }
];

const recentActivity = [
  {
    id: 1,
    type: "blog_post",
    title: "New blog post published",
    description: "Weekly Devotional: Finding Peace in Chaos",
    time: "2 hours ago",
    user: "Pastor Johnson"
  },
  {
    id: 2,
    type: "event",
    title: "Event created",
    description: "Community Food Drive - February 2024",
    time: "4 hours ago",
    user: "Admin User"
  },
  {
    id: 3,
    type: "contact",
    title: "New contact form submission",
    description: "Prayer request from Sarah M.",
    time: "6 hours ago",
    user: "System"
  },
  {
    id: 4,
    type: "donation",
    title: "Donation received",
    description: "$250 donation for missions",
    time: "8 hours ago",
    user: "Anonymous"
  }
];

const quickActions = [
  {
    title: "Add Blog Post",
    description: "Create a new blog post",
    icon: FaNewspaper,
    href: "/Admin/Blog",
    color: "blue"
  },
  {
    title: "Schedule Event",
    description: "Add a new church event",
    icon: FaCalendarAlt,
    href: "/Admin/Events",
    color: "green"
  },
  {
    title: "Manage Testimonials",
    description: "Add or edit testimonials",
    icon: FaComments,
    href: "/Admin/Testimonials",
    color: "purple"
  },
  {
    title: "Update Homepage",
    description: "Edit homepage content",
    icon: FaEdit,
    href: "/Admin/Homepage",
    color: "yellow"
  },
  {
    title: "View Donations",
    description: "Check donation records",
    icon: FaDollarSign,
    href: "/Admin/Donations",
    color: "red"
  },
  {
    title: "Settings",
    description: "Configure site settings",
    icon: FaCog,
    href: "/Admin/Settings",
    color: "gray"
  }
];

export default function AdminDashboard() {
  const [notifications, setNotifications] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Welcome back! Here's what's happening with your church website.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <FaBell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Last updated: 5 minutes ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
                  <p className={`text-sm mt-2 ${
                    stat.changeType === 'positive'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-full ${
                  stat.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' :
                  stat.color === 'green' ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' :
                  stat.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' :
                  stat.color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400' :
                  'bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400'
                }`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link href={action.href}>
                      <div className={`p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all cursor-pointer ${
                        action.color === 'blue' ? 'hover:bg-blue-50 dark:hover:bg-blue-900/10' :
                        action.color === 'green' ? 'hover:bg-green-50 dark:hover:bg-green-900/10' :
                        action.color === 'purple' ? 'hover:bg-purple-50 dark:hover:bg-purple-900/10' :
                        action.color === 'yellow' ? 'hover:bg-yellow-50 dark:hover:bg-yellow-900/10' :
                        action.color === 'red' ? 'hover:bg-red-50 dark:hover:bg-red-900/10' :
                        'hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            action.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' :
                            action.color === 'green' ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' :
                            action.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' :
                            action.color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400' :
                            action.color === 'red' ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400' :
                            'bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400'
                          }`}>
                            <action.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {action.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {action.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className={`p-2 rounded-full ${
                    activity.type === 'blog_post' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' :
                    activity.type === 'event' ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' :
                    activity.type === 'contact' ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' :
                    'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400'
                  }`}>
                    {activity.type === 'blog_post' && <FaNewspaper className="w-4 h-4" />}
                    {activity.type === 'event' && <FaCalendarAlt className="w-4 h-4" />}
                    {activity.type === 'contact' && <FaComments className="w-4 h-4" />}
                    {activity.type === 'donation' && <FaDollarSign className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {activity.description}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        {activity.time}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        by {activity.user}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                View all activity →
              </button>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            System Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Website Status</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">All systems operational</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Database</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Connected and healthy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Backup</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Last backup: 2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}