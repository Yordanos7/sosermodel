import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CalendarDaysIcon,
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";
import api from "../../lib/axios";

const Events = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All Events");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/events");
        if (response.data) {
          const events = response.data.map((event) => ({
            ...event,
            time: `${event.startTime} - ${event.endTime}`,
            type: event.eventType,
            image: `/${Math.floor(Math.random() * 5) + 1}.png`,
            featured: Math.random() > 0.5,
            registered: Math.floor(Math.random() * event.capacity),
          }));
          setUpcomingEvents(events);
          setFilteredEvents(events);

          const types = [
            { name: "All Events", count: events.length },
            ...Object.entries(
              events.reduce((acc, event) => {
                acc[event.type] = (acc[event.type] || 0) + 1;
                return acc;
              }, {})
            ).map(([name, count]) => ({ name, count })),
          ];
          setEventTypes(types);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleFilter = (type) => {
    setActiveFilter(type);
    if (type === "All Events") {
      setFilteredEvents(upcomingEvents);
    } else {
      setFilteredEvents(upcomingEvents.filter((event) => event.type === type));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getAvailableSpots = (capacity, registered) => {
    return capacity - registered;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Upcoming Events
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us for educational workshops, training sessions, and community
            events designed to empower and inform our members.
          </p>
        </motion.div>

        {/* Event Filters */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-2 bg-white p-2 rounded-full shadow">
            {eventTypes.map((type) => (
              <button
                key={type.name}
                onClick={() => handleFilter(type.name)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                  activeFilter === type.name
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {type.name} ({type.count})
              </button>
            ))}
          </div>
        </div>

        {/* Featured Events */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Featured Events
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredEvents
              .filter((event) => event.featured)
              .slice(0, 2)
              .map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div
                    className="relative h-48 bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center"
                    style={{
                      backgroundImage: `url(${event.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="text-white text-center">
                        <CalendarDaysIcon className="w-16 h-16 mx-auto mb-2" />
                        <p className="text-lg font-semibold">{event.type}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {event.type}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {getAvailableSpots(event.capacity, event.registered)}{" "}
                        spots left
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-gray-600">
                        <CalendarDaysIcon className="w-5 h-5 mr-2" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <ClockIcon className="w-5 h-5 mr-2" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPinIcon className="w-5 h-5 mr-2" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <UserGroupIcon className="w-5 h-5 mr-2" />
                        <span>
                          {event.registered}/{event.capacity} registered
                        </span>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200">
                      Register Now
                    </button>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* All Events */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">All Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      event.featured
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {event.type}
                  </span>
                  {event.featured && (
                    <span className="text-yellow-500">⭐</span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <CalendarDaysIcon className="w-4 h-4 mr-2" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPinIcon className="w-4 h-4 mr-2" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">
                    {event.registered}/{event.capacity} registered
                  </span>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${(event.registered / event.capacity) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-2 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200 text-sm">
                  Register
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl shadow-lg p-8 text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Don't Miss Out!</h2>
          <p className="text-xl mb-8">
            Subscribe to our newsletter to stay updated on upcoming events and
            workshops.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Events;
