/**
 * Events - Church events and calendar page
 * Features:
 * - Interactive calendar view
 * - Upcoming events list
 * - Event categories
 * - Event registration
 * - Recurring events
 */

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUsers, FaPlus } from "react-icons/fa";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// Sample events data
const eventsData = [
  {
    id: 1,
    title: "Sunday Worship Service",
    start: "2026-01-26T09:00:00",
    end: "2026-01-26T11:00:00",
    description: "Weekly worship service with praise and worship, sermon, and fellowship",
    location: "Chia View Mission Center",
    category: "worship",
    recurring: "weekly",
    color: "#3B82F6"
  },
  {
    id: 2,
    title: "Youth Bible Study",
    start: "2026-01-28T18:00:00",
    end: "2026-01-28T20:00:00",
    description: "Interactive Bible study for young people aged 13-25",
    location: "Community Hall",
    category: "youth",
    recurring: "weekly",
    color: "#10B981"
  },
  {
    id: 3,
    title: "Community Food Drive",
    start: "2026-02-01T10:00:00",
    end: "2026-02-01T16:00:00",
    description: "Help distribute food packages to families in need",
    location: "Mission Center Parking Lot",
    category: "outreach",
    color: "#F59E0B"
  },
  {
    id: 4,
    title: "Prayer Meeting",
    start: "2026-01-30T19:00:00",
    end: "2026-01-30T21:00:00",
    description: "Weekly prayer gathering for spiritual growth and intercession",
    location: "Chia View Mission Center",
    category: "prayer",
    recurring: "weekly",
    color: "#8B5CF6"
  },
  {
    id: 5,
    title: "Women's Fellowship",
    start: "2026-02-05T14:00:00",
    end: "2026-02-05T16:00:00",
    description: "Monthly gathering for women to connect, pray, and grow together",
    location: "Fellowship Hall",
    category: "fellowship",
    recurring: "monthly",
    color: "#EC4899"
  },
  {
    id: 6,
    title: "Children's Ministry",
    start: "2026-01-26T10:00:00",
    end: "2026-01-26T11:30:00",
    description: "Sunday school and activities for children",
    location: "Children's Wing",
    category: "children",
    recurring: "weekly",
    color: "#06B6D4"
  }
];

const eventCategories = {
  worship: { name: "Worship Services", color: "#3B82F6", icon: "🙏" },
  youth: { name: "Youth Programs", color: "#10B981", icon: "👥" },
  outreach: { name: "Community Outreach", color: "#F59E0B", icon: "🤝" },
  prayer: { name: "Prayer Meetings", color: "#8B5CF6", icon: "🙏" },
  fellowship: { name: "Fellowship", color: "#EC4899", icon: "👭" },
  children: { name: "Children's Ministry", color: "#06B6D4", icon: "👶" }
};

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('calendar'); // calendar or list
  const [events, setEvents] = useState(eventsData);

  // Filter events
  const filteredEvents = filter === 'all'
    ? events
    : events.filter(event => event.category === filter);

  // Get upcoming events (next 30 days)
  const upcomingEvents = events
    .filter(event => new Date(event.start) > new Date())
    .sort((a, b) => new Date(a.start) - new Date(b.start))
    .slice(0, 5);

  const handleEventClick = (clickInfo) => {
    const event = events.find(e => e.id.toString() === clickInfo.event.id);
    setSelectedEvent(event);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Church Events & Calendar
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join us for worship services, prayer meetings, community outreach,
              and fellowship opportunities that strengthen our faith and community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setView('calendar')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                view === 'calendar'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <FaCalendarAlt className="inline mr-2" />
              Calendar View
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                view === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <FaUsers className="inline mr-2" />
              List View
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              <option value="all">All Events</option>
              {Object.entries(eventCategories).map(([key, category]) => (
                <option key={key} value={key}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar/List View */}
          <div className="lg:col-span-2">
            {view === 'calendar' ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                  }}
                  initialView="dayGridMonth"
                  events={filteredEvents.map(event => ({
                    id: event.id.toString(),
                    title: event.title,
                    start: event.start,
                    end: event.end,
                    backgroundColor: event.color,
                    borderColor: event.color
                  }))}
                  eventClick={handleEventClick}
                  height="auto"
                  aspectRatio={1.5}
                  dayMaxEvents={3}
                />
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {event.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                          <div className="flex items-center gap-1">
                            <FaCalendarAlt className="w-4 h-4" />
                            {formatDate(event.start)}
                          </div>
                          <div className="flex items-center gap-1">
                            <FaClock className="w-4 h-4" />
                            {formatTime(event.start)} - {formatTime(event.end)}
                          </div>
                          <div className="flex items-center gap-1">
                            <FaMapMarkerAlt className="w-4 h-4" />
                            {event.location}
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">
                          {event.description}
                        </p>
                      </div>
                      <div
                        className="w-4 h-4 rounded-full ml-4 flex-shrink-0"
                        style={{ backgroundColor: event.color }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Upcoming Events
              </h3>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                      {event.title}
                    </h4>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(event.start)} at {formatTime(event.start)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Categories */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Event Categories
              </h3>
              <div className="space-y-2">
                {Object.entries(eventCategories).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => setFilter(key)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                      filter === key
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedEvent.title}
                </h2>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <FaCalendarAlt className="w-5 h-5" />
                  <span>{formatDate(selectedEvent.start)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <FaClock className="w-5 h-5" />
                  <span>{formatTime(selectedEvent.start)} - {formatTime(selectedEvent.end)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <FaMapMarkerAlt className="w-5 h-5" />
                  <span>{selectedEvent.location}</span>
                </div>
                {selectedEvent.recurring && (
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <FaPlus className="w-5 h-5" />
                    <span>Recurring: {selectedEvent.recurring}</span>
                  </div>
                )}
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {selectedEvent.description}
              </p>

              <div className="flex gap-3">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Register for Event
                </button>
                <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Add to Calendar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}