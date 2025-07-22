import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BriefcaseIcon,
  MapPinIcon,
  ClockIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
  CalendarDaysIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { getVacancies } from "../../api/vacancy";

const Vacancies = () => {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const data = await getVacancies();
        setJobOpenings(data);
      } catch (error) {
        console.error("Failed to fetch vacancies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVacancies();
  }, []);

  console.log(jobOpenings);

  const departments = [
    { name: "All Departments", count: jobOpenings.length, active: true },
    {
      name: "Finance",
      count: jobOpenings.filter((job) => job.department === "Finance").length,
      active: false,
    },
    {
      name: "Marketing",
      count: jobOpenings.filter((job) => job.department === "Marketing").length,
      active: false,
    },
    {
      name: "Credit & Loans",
      count: jobOpenings.filter((job) => job.department === "Credit & Loans")
        .length,
      active: false,
    },
    {
      name: "IT",
      count: jobOpenings.filter(
        (job) => job.department === "Information Technology"
      ).length,
      active: false,
    },
    {
      name: "Customer Service",
      count: jobOpenings.filter((job) => job.department === "Customer Service")
        .length,
      active: false,
    },
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
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
            Career Opportunities
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our team and be part of Ethiopia's leading financial
            cooperative. We offer competitive salaries, growth opportunities,
            and a chance to make a real impact.
          </p>
        </motion.div>

        {/* Job Listings */}
        <div className="space-y-6">
          {loading ? (
            <p>Loading vacancies...</p>
          ) : (
            jobOpenings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <h3 className="text-2xl font-bold text-gray-900">
                          {job.title}
                        </h3>
                        {job.urgent && (
                          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                            Urgent
                          </span>
                        )}
                      </div>
                      <span className="text-gray-500 text-sm lg:hidden">
                        {getDaysRemaining(job.applicationDeadline)} days left
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="flex items-center text-gray-600">
                        <BriefcaseIcon className="w-5 h-5 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">Department</p>
                          <p className="font-medium">{job.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPinIcon className="w-5 h-5 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-medium">{job.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <ClockIcon className="w-5 h-5 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">Type</p>
                          <p className="font-medium">{job.employmentType}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <CurrencyDollarIcon className="w-5 h-5 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">Salary</p>
                          <p className="font-medium">
                            {job.salaryMin && job.salaryMax
                              ? `${job.salaryMin} - ${job.salaryMax} ETB`
                              : "Not Disclosed"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6">{job.jobDescription}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Requirements:
                        </h4>
                        <ul className="space-y-1">
                          {job.requirements
                            .split("\n")
                            .slice(0, 3)
                            .map((req, idx) => (
                              <li
                                key={idx}
                                className="text-gray-600 text-sm flex items-start"
                              >
                                <span className="text-blue-600 mr-2">•</span>
                                {req}
                              </li>
                            ))}
                          {job.requirements.split("\n").length > 3 && (
                            <li className="text-blue-600 text-sm">
                              +{job.requirements.split("\n").length - 3} more
                              requirements
                            </li>
                          )}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Key Responsibilities:
                        </h4>
                        <ul className="space-y-1">
                          {job.responsibilities
                            .split("\n")
                            .slice(0, 3)
                            .map((resp, idx) => (
                              <li
                                key={idx}
                                className="text-gray-600 text-sm flex items-start"
                              >
                                <span className="text-green-600 mr-2">•</span>
                                {resp}
                              </li>
                            ))}
                          {job.responsibilities.split("\n").length > 3 && (
                            <li className="text-green-600 text-sm">
                              +{job.responsibilities.split("\n").length - 3}{" "}
                              more responsibilities
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Posted: {formatDate(job.createdAt)}</span>
                        <span>•</span>
                        <span>
                          Deadline: {formatDate(job.applicationDeadline)}
                        </span>
                      </div>
                      <div className="hidden lg:block">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            getDaysRemaining(job.applicationDeadline) <= 7
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {getDaysRemaining(job.applicationDeadline)} days left
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 lg:mt-0 lg:ml-8 flex-shrink-0">
                    <div className="flex flex-col space-y-3"></div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Application Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl shadow-lg p-8 text-white"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">
            Application Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <AcademicCapIcon className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Prepare Your Documents
              </h3>
              <p>
                Have your CV, certificates, and references ready before
                applying.
              </p>
            </div>
            <div className="text-center">
              <BriefcaseIcon className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Tailor Your Application
              </h3>
              <p>
                Customize your CV and cover letter for each specific position.
              </p>
            </div>
            <div className="text-center">
              <CalendarDaysIcon className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Apply Early</h3>
              <p>
                Don't wait until the deadline. Early applications get more
                attention.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Vacancies;
