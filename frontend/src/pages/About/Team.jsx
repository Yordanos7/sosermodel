import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { fetchTeamMembers } from "../../api/team";

const Team = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [team, setTeam] = useState([]);

  const generalAssemblyRef = useRef(null);
  const controlCommitteeRef = useRef(null);
  const leadershipTeamRef = useRef(null);
  const divisionHeadsRef = useRef(null);
  const branchOfficesRef = useRef(null);

  useEffect(() => {
    const getTeam = async () => {
      const data = await fetchTeamMembers();
      setTeam(data);
    };
    getTeam();
  }, []);

  const renderMembers = (category, limit) => {
    return team
      .filter((member) => member.category === category)
      .slice(0, limit)
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
              className="w-full h-auto object-contain object-center hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-4 sm:p-5 text-center bg-gradient-to-b from-gray-50 to-gray-100 flex-grow flex flex-col justify-center">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
              {member.name}
            </h3>
            <p className="text-blue-600 font-semibold text-sm sm:text-base">
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6 tracking-tight">
            {t("team.header.title")}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto">
            {t("team.header.description")}
          </p>
        </motion.div>

        {/* General Assembly */}
        <section
          ref={generalAssemblyRef}
          className="mb-16 sm:mb-20 md:mb-24 scroll-mt-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 md:mb-10 text-center">
            {t("team.general_assembly.title")}
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {renderMembers("General Assembly", 1)}
          </div>
        </section>

        {/* Control Committee */}
        <section
          ref={controlCommitteeRef}
          className="mb-16 sm:mb-20 md:mb-24 scroll-mt-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 md:mb-10 text-center">
            {t("team.control_committee.title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {renderMembers("Control Committee", 3)}
          </div>
        </section>

        {/* Executive Leadership */}
        <section
          ref={leadershipTeamRef}
          className="mb-16 sm:mb-20 md:mb-24 scroll-mt-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 md:mb-10 text-center">
            {t("team.executive_leadership.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {renderMembers("Executive Leadership", 2)}
          </div>
        </section>

        {/* Division Leadership */}
        <section
          ref={divisionHeadsRef}
          className="mb-16 sm:mb-20 md:mb-24 scroll-mt-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 md:mb-10 text-center">
            {t("team.division_leadership.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {renderMembers("Division Leadership", 4)}
          </div>
        </section>

        {/* Branch Network */}
        <section
          ref={branchOfficesRef}
          className="mb-16 sm:mb-20 md:mb-24 scroll-mt-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 md:mb-10 text-center">
            {t("team.branch_network.title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {renderMembers("Branch Network", 3)}
          </div>
          <div className="text-center mt-8">
            <motion.button
              onClick={() => navigate("/all-staff")}
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold text-lg py-3 px-8 rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-900 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              view all
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </motion.button>
          </div>
        </section>

        {/* Back to Top Button */}
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 sm:p-4 rounded-full shadow-xl hover:bg-blue-700 transition-colors duration-300 z-20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={t("team.back_to_top")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6"
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

export default Team;
