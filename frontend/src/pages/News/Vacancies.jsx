import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  BriefcaseIcon,
  MapPinIcon,
  ClockIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { getVacancies } from "../../api/vacancy";

const Vacancies = () => {
  const { t, i18n } = useTranslation();
  const [jobOpenings, setJobOpenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const departments = [
    {
      name: t("vacancies.job_listings.department.all"),
      count: jobOpenings.length,
      active: true,
    },
    {
      name: t("vacancies.job_listings.department.finance"),
      count: jobOpenings.filter((job) => job.department === "Finance").length,
      active: false,
    },
    {
      name: t("vacancies.job_listings.department.marketing"),
      count: jobOpenings.filter((job) => job.department === "Marketing").length,
      active: false,
    },
    {
      name: t("vacancies.job_listings.department.credit_loans"),
      count: jobOpenings.filter((job) => job.department === "Credit & Loans")
        .length,
      active: false,
    },
    {
      name: t("vacancies.job_listings.department.it"),
      count: jobOpenings.filter(
        (job) => job.department === "Information Technology"
      ).length,
      active: false,
    },
    {
      name: t("vacancies.job_listings.department.customer_service"),
      count: jobOpenings.filter((job) => job.department === "Customer Service")
        .length,
      active: false,
    },
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(i18n.language, {
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

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
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
            {t("vacancies.header.title")}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            {t("vacancies.header.description")}
          </p>
        </motion.div>

        {/* Job Listings */}
        <div className="space-y-4 sm:space-y-6">
          {loading ? (
            <p className="text-center text-sm sm:text-base text-gray-600">
              {t("vacancies.job_listings.loading")}
            </p>
          ) : (
            jobOpenings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg p-2 sm:p-4 md:p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-shrink-0 lg:mr-4 sm:mr-6 md:mr-8 mb-2 sm:mb-4 md:mb-6 lg:mb-0">
                    <img
                      src={`https://soserunion.com/${job.image}`}
                      alt={job.title}
                      className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] h-auto object-cover rounded-md sm:rounded-lg cursor-pointer hover:opacity-90 transition-opacity duration-300"
                      onClick={() =>
                        handleImageClick(`https://soserunion.com/${job.image}`)
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2 sm:mb-4">
                      <div className="flex items-center space-x-2 sm:space-x-4">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">
                          {job.title}
                        </h3>
                        {job.urgent && (
                          <span className="bg-red-100 text-red-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                            {t("vacancies.job_listings.urgent")}
                          </span>
                        )}
                      </div>
                      <span className="text-gray-500 text-xs sm:text-sm lg:hidden">
                        {t("vacancies.job_listings.days_left", {
                          count: getDaysRemaining(job.applicationDeadline),
                        })}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-2 sm:mb-4 md:mb-6">
                      <div className="flex items-center text-gray-600 text-xs sm:text-sm">
                        <BriefcaseIcon className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                        <div>
                          <p className="text-xs sm:text-sm text-gray-500">
                            {t("vacancies.job_listings.department")}
                          </p>
                          <p className="font-medium">{job.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-600 text-xs sm:text-sm">
                        <MapPinIcon className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                        <div>
                          <p className="text-xs sm:text-sm text-gray-500">
                            {t("vacancies.job_listings.location")}
                          </p>
                          <p className="font-medium">{job.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-600 text-xs sm:text-sm">
                        <ClockIcon className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                        <div>
                          <p className="text-xs sm:text-sm text-gray-500">
                            {t("vacancies.job_listings.type")}
                          </p>
                          <p className="font-medium">{job.employmentType}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-600 text-xs sm:text-sm">
                        <CurrencyDollarIcon className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                        <div>
                          <p className="text-xs sm:text-sm text-gray-500">
                            {t("vacancies.job_listings.salary")}
                          </p>
                          <p className="font-medium">
                            {job.salaryMin && job.salaryMax
                              ? `${job.salaryMin} - ${job.salaryMax} ETB`
                              : t(
                                  "vacancies.job_listings.salary_not_disclosed"
                                )}
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4 md:mb-6">
                      {job.jobDescription}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 md:gap-6 mb-2 sm:mb-4 md:mb-6">
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm sm:text-base mb-2 sm:mb-3">
                          {t("vacancies.job_listings.requirements")}
                        </h4>
                        <ul className="space-y-1">
                          {job.requirements
                            .split("\n")
                            .slice(0, 3)
                            .map((req, idx) => (
                              <li
                                key={idx}
                                className="text-gray-600 text-xs sm:text-sm flex items-start"
                              >
                                <span className="text-blue-600 mr-2">•</span>
                                {req}
                              </li>
                            ))}
                          {job.requirements.split("\n").length > 3 && (
                            <li className="text-blue-600 text-xs sm:text-sm">
                              {t("vacancies.job_listings.more_requirements", {
                                count: job.requirements.split("\n").length - 3,
                              })}
                            </li>
                          )}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm sm:text-base mb-2 sm:mb-3">
                          {t("vacancies.job_listings.responsibilities")}
                        </h4>
                        <ul className="space-y-1">
                          {job.responsibilities
                            .split("\n")
                            .slice(0, 3)
                            .map((resp, idx) => (
                              <li
                                key={idx}
                                className="text-gray-600 text-xs sm:text-sm flex items-start"
                              >
                                <span className="text-green-600 mr-2">•</span>
                                {resp}
                              </li>
                            ))}
                          {job.responsibilities.split("\n").length > 3 && (
                            <li className="text-green-600 text-xs sm:text-sm">
                              {t(
                                "vacancies.job_listings.more_responsibilities",
                                {
                                  count:
                                    job.responsibilities.split("\n").length - 3,
                                }
                              )}
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-500">
                        <span>
                          {t("vacancies.job_listings.posted", {
                            date: formatDate(job.createdAt),
                          })}
                        </span>
                        <span>•</span>
                        <span>
                          {t("vacancies.job_listings.deadline", {
                            date: formatDate(job.applicationDeadline),
                          })}
                        </span>
                      </div>
                      <div className="hidden lg:block">
                        <span
                          className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                            getDaysRemaining(job.applicationDeadline) <= 7
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {t("vacancies.job_listings.days_left", {
                            count: getDaysRemaining(job.applicationDeadline),
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <div className="relative max-w-4xl w-full p-2 sm:p-4">
              <img
                src={selectedImage}
                alt="Job Preview"
                className="w-full h-auto rounded-md sm:rounded-lg max-h-[90vh] object-contain"
              />
              <button
                className="absolute top-2 right-2 text-white bg-red-600 rounded-full p-2 text-xs sm:text-sm"
                onClick={closeModal}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Application Tips */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-4 sm:mt-8 md:mt-12 lg:mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-md sm:rounded-lg shadow-md sm:shadow-lg p-4 sm:p-6 md:p-8 text-white"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 text-center">
            {t("vacancies.application_tips.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4 md:gap-6">
            <div className="text-center">
              <AcademicCapIcon className="w-8 sm:w-12 h-8 sm:h-12 mx-auto mb-2 sm:mb-4" />
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">
                {t("vacancies.application_tips.tip1.title")}
              </h3>
              <p className="text-xs sm:text-sm">
                {t("vacancies.application_tips.tip1.description")}
              </p>
            </div>
            <div className="text-center">
              <BriefcaseIcon className="w-8 sm:w-12 h-8 sm:h-12 mx-auto mb-2 sm:mb-4" />
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">
                {t("vacancies.application_tips.tip2.title")}
              </h3>
              <p className="text-xs sm:text-sm">
                {t("vacancies.application_tips.tip2.description")}
              </p>
            </div>
            <div className="text-center">
              <CalendarDaysIcon className="w-8 sm:w-12 h-8 sm:h-12 mx-auto mb-2 sm:mb-4" />
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">
                {t("vacancies.application_tips.tip3.title")}
              </h3>
              <p className="text-xs sm:text-sm">
                {t("vacancies.application_tips.tip3.description")}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Vacancies;
