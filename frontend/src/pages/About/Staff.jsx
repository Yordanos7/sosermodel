import React from "react";
import { motion } from "framer-motion";

const Staff = () => {
  const groupPhoto =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfwC-PR7daU0HcX1wbwZN1wLzcd3Kn1d0vxPSFWpCFGYFFSAmNT7Pg1uxvZ27oHO6CKSg&usqp=CAU";

  const staffMembers = [
    {
      id: 1,
      name: "John Doe",
      position: "Senior Accountant",
      image: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Loan Officer",
      image: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      id: 3,
      name: "Michael Brown",
      position: "Customer Service Manager",
      image: "https://randomuser.me/api/portraits/men/13.jpg",
    },
    {
      id: 4,
      name: "Emily Davis",
      position: "IT Specialist",
      image: "https://randomuser.me/api/portraits/women/14.jpg",
    },
    {
      id: 5,
      name: "David Wilson",
      position: "Branch Coordinator",
      image: "https://randomuser.me/api/portraits/men/15.jpg",
    },
    {
      id: 6,
      name: "Sarah Johnson",
      position: "Marketing Lead",
      image: "https://randomuser.me/api/portraits/women/16.jpg",
    },
    {
      id: 7,
      name: "James Lee",
      position: "Financial Analyst",
      image: "https://randomuser.me/api/portraits/men/17.jpg",
    },
    {
      id: 8,
      name: "Laura Martinez",
      position: "HR Assistant",
      image: "https://randomuser.me/api/portraits/women/18.jpg",
    },
    {
      id: 9,
      name: "Thomas Clark",
      position: "Credit Analyst",
      image: "https://randomuser.me/api/portraits/men/19.jpg",
    },
    {
      id: 10,
      name: "Anna Taylor",
      position: "Operations Manager",
      image: "https://randomuser.me/api/portraits/women/20.jpg",
    },
    {
      id: 11,
      name: "Robert White",
      position: "Compliance Officer",
      image: "https://randomuser.me/api/portraits/men/21.jpg",
    },
    {
      id: 12,
      name: "Lisa Adams",
      position: "Customer Support",
      image: "https://randomuser.me/api/portraits/women/22.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 md:mb-6 tracking-tight">
            Our Dedicated Staff
          </h1>
        </motion.div>

        {/* Group Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img
              src={groupPhoto}
              alt="Sosser Staff Group"
              className="w-full h-64 sm:h-80 md:h-96 object-cover"
            />
            <div className="p-4 sm:p-6 text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Soser Team Group Photo
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mt-2">
                Our entire team, united in our mission to give financial and
                membership growth.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Individual Staff Photos */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center">
            Our Team Members
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {staffMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-semibold text-sm sm:text-base">
                    {member.position}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staff;
