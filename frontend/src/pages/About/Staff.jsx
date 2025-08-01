import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { fetchTeamMembers } from "../../api/team";

const Staff = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [staff, setStaff] = useState([]);
  const dedicatedStaffRef = useRef(null);
  const teamMembersRef = useRef(null);

  useEffect(() => {
    const getStaff = async () => {
      const data = await fetchTeamMembers();
      setStaff(data);
    };
    getStaff();
  }, []);

  const renderStaff = (category) => {
    return staff
      .filter((member) => member.category === category)
      .map((member, index) => (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
          whileHover={{ scale: 1.03 }}
        >
          <div className="w-full overflow-hidden">
            <img
              src={`https://soserunion.com/${member.photo}`}
              alt={member.name}
              className="w-full h-auto max-w-full object-contain object-center hover:scale-105 transition-transform duration-500 max-h-[150px] sm:max-h-[200px]"
            />
          </div>
          <div className="p-3 sm:p-4 text-center bg-gradient-to-b from-gray-50 to-gray-100 flex-grow flex flex-col justify-center">
            <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1">
              {member.name}
            </h3>
            <p className="text-blue-600 font-semibold text-xs xs:text-sm sm:text-base">
              {member.position}
            </p>
            {member.bio && (
              <p className="text-gray-600 text-xs sm:text-sm mt-2 line-clamp-2">
                {member.bio}
              </p>
            )}
          </div>
        </motion.div>
      ));
  };

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-10 bg-white shadow-md py-2 px-2 xs:px-3 sm:px-4 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2 xs:gap-3 sm:gap-5">
          <button
            onClick={() => scrollToSection(dedicatedStaffRef)}
            className="px-2 xs:px-3 sm:px-4 py-1 text-blue-600 hover:text-blue-800 font-medium text-xs xs:text-sm sm:text-base rounded-md hover:bg-blue-50 transition-colors"
            aria-label={t("staff.dedicated_staff.title")}
          >
            {t("staff.dedicated_staff.title")}
          </button>
          <button
            onClick={() => scrollToSection(teamMembersRef)}
            className="px-2 xs:px-3 sm:px-4 py-1 text-blue-600 hover:text-blue-800 font-medium text-xs xs:text-sm sm:text-base rounded-md hover:bg-blue-50 transition-colors"
            aria-label={t("staff.team_members.title")}
          >
            {t("staff.team_members.title")}
          </button>
        </div>
      </nav>

      <div className="w-full max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 sm:mb-10 md:mb-12 lg:mb-16"
        >
          <h1 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-2 sm:mb-4 tracking-tight">
            {t("staff.dedicated_staff.title")}
          </h1>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {t("staff.dedicated_staff.description")}
          </p>
        </motion.div>

        <section
          ref={dedicatedStaffRef}
          className="mb-8 sm:mb-12 md:mb-16 lg:mb-20 scroll-mt-12"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 text-center">
            {t("staff.dedicated_staff.title")}
          </h2>
          <div className="w-full overflow-hidden min-h-[50vh] sm:min-h-[30vh] md:min-h-[40vh] lg:min-h-[50vh]">
            {staff.filter((member) => member.category === "Our Dedicated Staff")
              .length > 0 && (
              <motion.img
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                src={`https://soserunion.com/${
                  staff.find(
                    (member) => member.category === "Our Dedicated Staff"
                  ).photo
                }`}
                alt={t("staff.dedicated_staff.image_alt")}
                className="w-full h-full object-cover rounded-lg"
              />
            )}
          </div>
        </section>

        {/* Team Members */}
        <section
          ref={teamMembersRef}
          className="mb-8 sm:mb-12 md:mb-16 lg:mb-20 scroll-mt-12"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 text-center">
            {t("staff.team_members.title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 rounded-lg">
            {renderStaff("Our Team Members")}
          </div>
        </section>

        {/* Back to Top Button */}
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 bg-blue-600 text-white p-2 sm:p-3 rounded-full shadow-xl hover:bg-blue-700 transition-colors duration-300 z-20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={t("staff.back_to_top")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-5 sm:w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      </div>
    </div>
  );
};

export default Staff;
