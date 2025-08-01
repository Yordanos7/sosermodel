import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  CalendarDaysIcon,
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import api from "../../lib/axios";

const Events = () => {
  const { t, i18n } = useTranslation();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [activeFilter, setActiveFilter] = useState(
    t("events.filters.all_events")
  );

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/events");
        if (response.data && response.data.events) {
          const events = response.data.events.map((event) => ({
            ...event,
            time: `${event.startTime} - ${event.endTime}`,
            type: event.eventType,
            image: event.image
              ? `https://soserunion.com/${event.image}`
              : `/${Math.floor(Math.random() * 5) + 1}.png`,
            registered: Math.floor(Math.random() * event.capacity),
          }));
          setUpcomingEvents(events);
          setFilteredEvents(events);

          const types = [
            { name: t("events.filters.all_events"), count: events.length },
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
  }, [t]);

  const handleFilter = (type) => {
    setActiveFilter(type);
    if (type === t("events.filters.all_events")) {
      setFilteredEvents(upcomingEvents);
    } else {
      setFilteredEvents(upcomingEvents.filter((event) => event.type === type));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(i18n.language, {
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
    <div className="min-h-screen bg-gray-50 pt-4 lg:pt-8 w-full overflow-x-hidden mt-24">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-4 sm:mb-8 md:mb-12 lg:mb-16"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">
            {t("events.header.title")}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            {t("events.header.description")}
          </p>
        </motion.div>

        {/* Event Filters */}
        <div className="flex justify-center mb-4 sm:mb-8 md:mb-12 lg:mb-16">
          <div className="flex space-x-1 sm:space-x-2 bg-white p-2 rounded-full shadow">
            {eventTypes.map((type) => (
              <button
                key={type.name}
                onClick={() => handleFilter(type.name)}
                className={`px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-colors duration-200 ${
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
        <div className="mb-4 sm:mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-4">
            {t("events.featured_events.title")}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {filteredEvents
              .filter((event) => event.featured)
              .slice(0, 2)
              .map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
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
                        <CalendarDaysIcon className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-2" />
                        <p className="text-base sm:text-lg font-semibold">
                          {event.type}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 sm:p-4 md:p-6">
                    <div className="flex items-center justify-between mb-2 sm:mb-4">
                      <span className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                        {event.type}
                      </span>
                      <span className="text-gray-500 text-xs sm:text-sm">
                        {t("events.featured_events.spots_left", {
                          count: getAvailableSpots(
                            event.capacity,
                            event.registered
                          ),
                        })}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">
                      {event.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-4">
                      {event.description}
                    </p>

                    <div className="space-y-2 mb-4 sm:mb-6">
                      <div className="flex items-center text-gray-600 text-xs sm:text-sm">
                        <CalendarDaysIcon className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-xs sm:text-sm">
                        <ClockIcon className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-xs sm:text-sm">
                        <MapPinIcon className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-xs sm:text-sm">
                        <UserGroupIcon className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                        <span>
                          {t("events.featured_events.registered", {
                            registered: event.registered,
                            capacity: event.capacity,
                          })}
                        </span>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-2 sm:py-3 rounded-md sm:rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200 text-sm sm:text-base">
                      {t("events.cta.subscribe_button")}
                    </button>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* All Events */}
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-4">
            {t("events.all_events.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg p-2 sm:p-4 md:p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <span
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                      event.featured
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {event.type}
                  </span>
                  {event.featured && (
                    <span className="text-yellow-500 text-xs sm:text-sm">
                      {t("events.all_events.featured_label")}
                    </span>
                  )}
                </div>

                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-40 object-cover mb-4 rounded-t-md"
                />
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2">
                  {event.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4 line-clamp-2">
                  {event.description}
                </p>

                <div className="space-y-2 mb-2 sm:mb-4">
                  <div className="flex items-center text-gray-600 text-xs sm:text-sm">
                    <CalendarDaysIcon className="w-4 h-4 mr-2" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-xs sm:text-sm">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-xs sm:text-sm">
                    <MapPinIcon className="w-4 h-4 mr-2" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <span className="text-xs sm:text-sm text-gray-500">
                    {t("events.featured_events.registered", {
                      registered: event.registered,
                      capacity: event.capacity,
                    })}
                  </span>
                  <div className="w-12 sm:w-16 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${(event.registered / event.capacity) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-2 rounded-md sm:rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200 text-xs sm:text-sm">
                  {t("events.cta.subscribe_button")}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-4 sm:mt-8 md:mt-12 lg:mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-md sm:rounded-lg shadow-md sm:shadow-lg p-4 sm:p-6 md:p-8 text-white"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">
            {t("events.cta.title")}
          </h2>
          <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-8">
            {t("events.cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder={t("events.cta.email_placeholder")}
              className="flex-1 px-2 sm:px-4 py-2 sm:py-3 rounded-md sm:rounded-lg text-gray-900 text-xs sm:text-sm"
            />
            <button className="bg-white text-blue-600 px-4 sm:px-8 py-2 sm:py-3 rounded-md sm:rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-xs sm:text-sm">
              {t("events.cta.subscribe_button")}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Events;
