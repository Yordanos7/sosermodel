import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Team = () => {
  const navigate = useNavigate();
  const generalAssemblyRef = useRef(null);
  const controlCommitteeRef = useRef(null);
  const leadershipTeamRef = useRef(null);
  const divisionHeadsRef = useRef(null);
  const branchOfficesRef = useRef(null);

  const generalAssembly = [
    {
      id: 1,
      name: "General Member 1",
      position: "Assembly Member",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "General Member 2",
      position: "Assembly Member",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "General Member 3",
      position: "Assembly Member",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 4,
      name: "General Member 4",
      position: "Assembly Member",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      id: 5,
      name: "General Member 5",
      position: "Assembly Member",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      id: 6,
      name: "General Member 6",
      position: "Assembly Member",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      id: 7,
      name: "General Member 7",
      position: "Assembly Member",
      image: "https://randomuser.me/api/portraits/men/7.jpg",
    },
  ];

  const controlCommittee = [
    {
      id: 8,
      name: "Control Member 1",
      position: "Committee Member",
      image: "https://randomuser.me/api/portraits/men/8.jpg",
    },
    {
      id: 9,
      name: "Control Member 2",
      position: "Committee Member",
      image: "https://randomuser.me/api/portraits/women/9.jpg",
    },
    {
      id: 10,
      name: "Control Member 3",
      position: "Committee Member",
      image: "https://randomuser.me/api/portraits/men/10.jpg",
    },
  ];

  const leadershipTeam = [
    {
      id: 1,
      name: "Mr. Aschalew Mohamed Aliyu",
      position: "G/Manager",
      image: "/m.jpg",
    },
    {
      id: 2,
      name: "Mr. Bekalu shawul",
      position: "V/Manager",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  ];

  const divisionHeads = [
    {
      id: 3,
      name: "Mr. Badmaw Getinet",
      position: "Head of Finance, Procurement and Asset Management",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
    },
    {
      id: 4,
      name: "Mr. Assaye Atalay",
      position: "Head of Saving, Credit and Insurance Division",
      image: "https://randomuser.me/api/portraits/women/63.jpg",
    },
    {
      id: 5,
      name: "Mr. Daniel",
      position: "Head of Human Resources",
      image: "https://randomuser.me/api/portraits/men/81.jpg",
    },
    {
      id: 6,
      name: "Ms. Aida",
      position: "Head of Digital Banking",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  const branchOffices = [
    {
      id: 1,
      name: "Jawi Branch",
      leader: "Getaneh Asabu",
      staff: 12,
      image: "https://source.unsplash.com/random/300x200/?bank,building",
    },
    {
      id: 2,
      name: "Addis kidam Branch",
      leader: "Takele dagnaw",
      staff: 10,
      image: "https://source.unsplash.com/random/300x200/?office,building",
    },
    {
      id: 3,
      name: "Injibara Branch",
      leader: "Yeneneh Kassahun",
      staff: 8,
      image:
        "https://source.unsplash.com/random/300x200/?financial,institution",
    },
    {
      id: 4,
      name: "Fageta Branch",
      leader: "No name",
      staff: 7,
      image: "https://source.unsplash.com/random/300x200/?cooperative,bank",
    },
  ];

  const totalStaff = branchOffices.reduce(
    (sum, branch) => sum + branch.staff,
    0
  );

  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: "-100%",
      transition: { duration: 20, ease: "linear", repeat: Infinity },
    });
  }, [controls]);

  const handleHoverStart = () => controls.stop();
  const handleHoverEnd = () =>
    controls.start({
      x: "-100%",
      transition: { duration: 20, ease: "linear", repeat: Infinity },
    });

  const handleDragStart = () => controls.stop();
  const handleDragEnd = () =>
    controls.start({
      x: "-100%",
      transition: { duration: 20, ease: "linear", repeat: Infinity },
    });

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-10 bg-white shadow-md py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-4 sm:gap-6">
          <button
            onClick={() => scrollToSection(leadershipTeamRef)}
            className="text-blue-600 hover:text-blue-800 font-semibold text-sm sm:text-base"
          >
            Executive Leadership
          </button>
          <button
            onClick={() => scrollToSection(generalAssemblyRef)}
            className="text-blue-600 hover:text-blue-800 font-semibold text-sm sm:text-base"
          >
            General Assembly
          </button>
          <button
            onClick={() => scrollToSection(controlCommitteeRef)}
            className="text-blue-600 hover:text-blue-800 font-semibold text-sm sm:text-base"
          >
            Control Committee
          </button>
          <button
            onClick={() => scrollToSection(divisionHeadsRef)}
            className="text-blue-600 hover:text-blue-800 font-semibold text-sm sm:text-base"
          >
            Division Leadership
          </button>
          <button
            onClick={() => scrollToSection(branchOfficesRef)}
            className="text-blue-600 hover:text-blue-800 font-semibold text-sm sm:text-base"
          >
            Branch Network
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 md:mb-6 tracking-tight">
            Our Organizational Structure
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the dedicated team that drives Sosser's mission to empower
            communities through innovative financial services across Ethiopia.
          </p>
        </motion.div>

        {/* General Assembly */}
        <div ref={generalAssemblyRef} className="mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 text-center">
            General Assembly
          </h2>
          <div className="relative overflow-hidden cursor-grab">
            <motion.div
              className="flex space-x-3 sm:space-x-4"
              animate={controls}
              drag="x"
              dragConstraints={{
                left: -generalAssembly.length * 208,
                right: 0,
              }}
              onHoverStart={handleHoverStart}
              onHoverEnd={handleHoverEnd}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              style={{ width: `${generalAssembly.length * 208}px` }}
            >
              {[...generalAssembly, ...generalAssembly].map((member, index) => (
                <motion.div
                  key={`${member.id}-${index}`}
                  className="flex-shrink-0 w-44 sm:w-48 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                  <div className="p-3 sm:p-4 text-center bg-gradient-to-b from-gray-50 to-gray-100">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-semibold text-xs sm:text-sm">
                      {member.position}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <div className="absolute inset-y-0 left-0 w-8 sm:w-12 bg-gradient-to-r from-white to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-8 sm:w-12 bg-gradient-to-l from-white to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Control Committee */}
        <div ref={controlCommitteeRef} className="mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 text-center">
            Control Committee
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {controlCommittee.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-40 sm:h-48 md:h-56 object-cover"
                />
                <div className="p-3 sm:p-4 text-center bg-gradient-to-b from-gray-50 to-gray-100">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-semibold text-xs sm:text-sm">
                    {member.position}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Executive Leadership */}
        <div ref={leadershipTeamRef} className="mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 text-center">
            Executive Leadership
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {leadershipTeam.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                <div className="p-3 sm:p-4 md:p-6">
                  <div className="flex flex-col items-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 rounded-lg object-cover mb-2 sm:mb-3 md:mb-4"
                    />
                    <div className="text-center">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2 truncate">
                        {member.name}
                      </h3>
                      <p className="text-blue-600 font-semibold text-xs sm:text-sm md:text-base mb-1 sm:mb-2">
                        {member.position}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Division Leadership */}
        <div ref={divisionHeadsRef} className="mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 text-center">
            Division Leadership
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {divisionHeads.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                <div className="p-3 sm:p-4 md:p-6">
                  <div className="flex flex-col items-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-lg object-cover mb-2 sm:mb-3 md:mb-4"
                    />
                    <div className="text-center">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2 truncate">
                        {member.name}
                      </h3>
                      <p className="text-blue-600 font-semibold text-xs sm:text-sm md:text-base mb-1 sm:mb-2">
                        {member.position}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Branch Offices */}
        <div ref={branchOfficesRef} className="mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 text-center">
            Branch Network
          </h2>
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 md:mb-8">
              {branchOffices.map((branch) => (
                <motion.div
                  key={branch.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={branch.image}
                    alt={branch.name}
                    className="w-full h-32 sm:h-40 md:h-48 object-cover"
                  />
                  <div className="p-3 sm:p-4 bg-gradient-to-b from-gray-50 to-gray-100">
                    <h3 className="font-bold text-blue-800 text-sm sm:text-base md:text-lg truncate">
                      {branch.name}
                    </h3>
                    <h4 className="font-semibold text-gray-900 text-xs sm:text-sm">
                      Branch Manager: Mr. {branch.leader}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-gray-700 text-sm sm:text-base mb-4">
                Total staff across all branches: {totalStaff}
              </p>
              <button
                onClick={() => navigate("/all-staff")}
                className="inline-block bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                All Staff
              </button>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
