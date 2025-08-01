import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const Offices = () => {
  const { t } = useTranslation();
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [mapLoading, setMapLoading] = useState(true);
  const [mapError, setMapError] = useState("");

  const offices = [
    {
      id: 1,
      name: t("offices.main_office.title"), // Translated in UI, but hardcoded for data consistency
      city: "Dangila",
      region: "Amhara",
      address: "Dangila, kebela 05 Awi Zone, Ethiopia",
      phone: "+251582211539",
      email: "soserunion@gmail.com",
      hours: {
        weekdays: "8:00 AM - 5:00 PM",
        sunday: t("offices.main_office.sunday"),
      },
      manager: "Mr. Aschalew mohammed",
      staff: 45,
      established: "2002",
      featured: true,
      coordinates: { lat: 9.032, lng: 38.7615 },
    },
  ];

  const branches = [
    {
      id: 2,
      name: "Injibara Branch",
      city: "Injibara",
      region: "Amhara",
      address: "Injibara",
      phone: "+251582211540",
      email: "injibara@sosser.coop",
      hours: {
        weekdays: "8:30 AM - 5:30 PM",
        sunday: t("offices.main_office.sunday"),
      },
      manager: "Mr. Yeneneh Kassahun",
      staff: 28,

      featured: false,
      coordinates: { lat: 11.5937, lng: 37.3907 },
      image: "/injibara.png",
    },
    {
      id: 3,
      name: "Adiskedam Branch",
      city: "Adiskedam",
      region: "Amhara",
      address: "Adiskedam",
      phone: "+251582211541",
      email: "Adiskedam@sosser.coop",
      hours: {
        weekdays: "8:00 AM - 5:30 PM",
        sunday: t("offices.main_office.sunday"),
      },
      manager: "Mr. Takele Dagnaw",
      staff: 22,

      featured: false,
      coordinates: { lat: 10.3333, lng: 37.7333 },
      image: "/addiskidam.png",
    },
    {
      id: 5,
      name: "Jawi Branch",
      city: "Jawi",
      region: "Amhara",
      address: "Jawi",
      phone: "+251582211543",
      email: "Jawi@sosser.coop",
      hours: {
        weekdays: "8:00 AM - 5:30 PM",
        sunday: t("offices.main_office.sunday"),
      },
      manager: "Mr. Getaneh Asabu",
      staff: 18,

      featured: false,
      coordinates: { lat: 12.1167, lng: 37.7833 },
      image: "/jawi.png",
    },
  ];

  const stats = [
    {
      label: t("offices.statistics.total_offices"),
      value: offices.length + branches.length,
      icon: BuildingOfficeIcon,
    },
    {
      label: t("offices.statistics.regions_served"),
      value: "1",
      icon: MapPinIcon,
    },
    {
      label: t("offices.statistics.total_staff"),
      value: "427+",
      icon: UserGroupIcon,
    },
    {
      label: t("offices.statistics.years_of_service"),
      value: "15+",
      icon: ClockIcon,
    },
  ];

  useEffect(() => {
    // Simulate map loading (replace with actual API call if map data is dynamic)
    const timer = setTimeout(() => {
      setMapLoading(false);
    }, 1000);

    // Simulate potential map error (replace with actual error handling if needed)
    // Example: setMapError(t("offices.map.error", { message: "Failed to load map" }));
    return () => clearTimeout(timer);
  }, [t]);

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
            {t("offices.header.title")}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            {t("offices.header.description")}
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-6 mb-4 sm:mb-8 md:mb-12"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg p-2 sm:p-4 md:p-6 text-center"
            >
              <stat.icon className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600 mx-auto mb-1 sm:mb-2" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                {stat.value}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Interactive Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg p-4 sm:p-6 md:p-8 mb-4 sm:mb-8 md:mb-12 hover:shadow-xl transition-shadow duration-300"
        >
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 sm:mb-4 text-center">
            {t("offices.map.title")}
          </h2>
          {mapLoading && (
            <div className="text-center">
              <p className="text-sm sm:text-base text-gray-600">
                {t("offices.map.loading")}
              </p>
            </div>
          )}
          {mapError && (
            <div className="text-center">
              <p className="text-sm sm:text-base text-red-600">{mapError}</p>
            </div>
          )}
          {!mapLoading && !mapError && (
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1234.5678!2d36.848224!3d11.258804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2set!4v1727807700!5m2!1sen!2set"
                width="100%"
                height="450"
                style={{
                  border: 0,
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t("offices.map.alt_text")}
              ></iframe>
            </div>
          )}
        </motion.div>

        {/* Featured Offices */}
        <div className="mb-4 sm:mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-4 md:mb-6">
            {t("offices.main_office.title")}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-stretch">
            {offices
              .filter((office) => office.featured)
              .slice(0, 1)
              .map((office, index) => (
                <div key={office.id} className="contents">
                  {/* Office Info Card */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg p-4 sm:p-6 md:p-8 hover:shadow-xl transition-shadow duration-300 flex flex-col"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-4">
                      <div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                          {office.name}
                        </h3>
                        <p className="text-blue-600 font-semibold text-sm sm:text-base">
                          {office.city}, {office.region}
                        </p>
                      </div>
                      <div className="md:text-right">
                        <span className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                          {t("offices.main_office.established")}{" "}
                          {office.established}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 flex-grow">
                      <div className="flex items-start">
                        <MapPinIcon className="w-5 sm:w-6 h-5 sm:h-6 text-gray-400 mr-2 sm:mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-800 text-sm sm:text-base">
                            {t("offices.main_office.address")}
                          </p>
                          <p className="text-gray-600 text-xs sm:text-sm">
                            {office.address}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <PhoneIcon className="w-5 sm:w-6 h-5 sm:h-6 text-gray-400 mr-2 sm:mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-800 text-sm sm:text-base">
                            {t("offices.main_office.phone")}
                          </p>
                          <p className="text-gray-600 text-xs sm:text-sm">
                            {office.phone}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <EnvelopeIcon className="w-5 sm:w-6 h-5 sm:h-6 text-gray-400 mr-2 sm:mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-800 text-sm sm:text-base">
                            {t("offices.main_office.email")}
                          </p>
                          <p className="text-gray-600 text-xs sm:text-sm">
                            {office.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <ClockIcon className="w-5 sm:w-6 h-5 sm:h-6 text-gray-400 mr-2 sm:mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-800 text-sm sm:text-base">
                            {t("offices.main_office.business_hours")}
                          </p>
                          <p className="text-gray-600 text-xs sm:text-sm">
                            {t("offices.main_office.weekdays")}:{" "}
                            {office.hours.weekdays}
                          </p>
                          <p className="text-gray-600 text-xs sm:text-sm">
                            {t("offices.main_office.sunday")}:{" "}
                            {office.hours.sunday}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto pt-3 sm:pt-4 border-t border-gray-200">
                      <div className="text-gray-600">
                        <p className="font-medium text-sm sm:text-base">
                          {t("offices.main_office.manager")}:
                        </p>
                        <p className="text-sm sm:text-base">{office.manager}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Office Image */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.3 + index * 0.1 + 0.2,
                    }}
                    viewport={{ once: true }}
                    className="relative rounded-md sm:rounded-lg overflow-hidden shadow-md sm:shadow-lg h-full min-h-[200px] sm:min-h-[300px] lg:min-h-[400px]"
                  >
                    <img
                      src="/head.JPG"
                      alt={`${office.name} ${t(
                        "offices.main_office.title"
                      ).toLowerCase()}`}
                      className="w-full h-full object-cover rounded-md sm:rounded-lg transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4 sm:p-6">
                      <div className="text-white">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold">
                          {office.name}
                        </h3>
                        <p className="text-blue-200 text-xs sm:text-sm">
                          {office.address}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
          </div>
        </div>

        {/* Branch Offices */}
        <div className="mb-4 sm:mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-4 md:mb-6">
            {t("offices.branches.title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {branches.map((branch, index) => (
              <motion.div
                key={branch.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Branch Image */}
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img
                    src={branch.image}
                    alt={`${branch.name} ${t("offices.branches.title")
                      .toLowerCase()
                      .slice(0, -1)}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-3 sm:p-4">
                    <h3 className="text-white font-bold text-sm sm:text-base">
                      {branch.name}
                    </h3>
                  </div>
                </div>

                {/* Branch Info */}
                <div className="p-3 sm:p-4 md:p-6">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <p className="text-blue-600 font-medium text-sm sm:text-base">
                      {branch.city}
                    </p>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs sm:text-sm font-medium">
                      {t("offices.main_office.established")}{" "}
                      {branch.established}
                    </span>
                  </div>

                  <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                    <div className="flex items-start">
                      <MapPinIcon className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 mr-2 mt-1 flex-shrink-0" />
                      <p className="text-xs sm:text-sm text-gray-600">
                        {branch.address}
                      </p>
                    </div>

                    <div className="flex items-start">
                      <ClockIcon className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 mr-2 mt-1 flex-shrink-0" />
                      <p className="text-xs sm:text-sm text-gray-600">
                        {t("offices.main_office.weekdays")}:{" "}
                        {branch.hours.weekdays}
                      </p>
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm text-gray-500">
                    <p>
                      <span className="font-medium">
                        {t("offices.main_office.manager")}:
                      </span>{" "}
                      {branch.manager}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-4 sm:mt-8 md:mt-12 lg:mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-md sm:rounded-lg shadow-md sm:shadow-lg p-4 sm:p-6 md:p-8 text-white"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">
            {t("offices.cta.title")}
          </h2>
          <p className="text-xs sm:text-sm md:text-base mb-4 sm:mb-6 md:mb-8">
            {t("offices.cta.description")}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Offices;
