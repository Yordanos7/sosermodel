import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  addVacancy,
  getVacancies,
  getVacancy,
  updateVacancy,
  deleteVacancy,
} from "../../api/vacancy";
import {
  PlusIcon,
  BriefcaseIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  ClockIcon,
  EyeIcon,
  CheckCircleIcon,
  AcademicCapIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AddVacancy = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    employmentType: "full-time",
    experienceLevel: "mid-level",
    salaryMin: "",
    salaryMax: "",
    applicationDeadline: "",
    jobDescription: "",
    responsibilities: "",
    requirements: "",
    qualifications: "",
    benefits: "",
    contactEmail: "",
    contactPhone: "",
    hiringManager: "",
    urgent: false,
    image: null,
  });
  const [vacancies, setVacancies] = useState([]);
  const [preview, setPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          title: "",
          department: "",
          location: "",
          employmentType: "full-time",
          experienceLevel: "mid-level",
          salaryMin: "",
          salaryMax: "",
          applicationDeadline: "",
          jobDescription: "",
          responsibilities: "",
          requirements: "",
          qualifications: "",
          benefits: "",
          contactEmail: "",
          contactPhone: "",
          hiringManager: "",
          urgent: false,
          image: null,
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const data = await getVacancies();
        setVacancies(data);
      } catch (error) {
        console.error("Failed to fetch vacancies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      const fetchVacancy = async () => {
        try {
          const data = await getVacancy(id);
          setFormData({
            ...data,
            applicationDeadline: data.applicationDeadline.split("T")[0],
          });
        } catch (error) {
          console.error("Failed to fetch vacancy:", error);
        }
      };
      fetchVacancy();
    }

    fetchVacancies();
  }, [id]);

  const departments = [
    { value: "finance", label: "Finance" },
    { value: "operations", label: "Operations" },
    { value: "technology", label: "Information Technology" },
    { value: "marketing", label: "Marketing" },
    { value: "customer-service", label: "Customer Service" },
    { value: "human-resources", label: "Human Resources" },
    { value: "credit-loans", label: "Credit & Loans" },
    { value: "audit-compliance", label: "Audit & Compliance" },
    { value: "risk-management", label: "Risk Management" },
    { value: "business-development", label: "Business Development" },
    { value: "other", label: "other" },
  ];

  const employmentTypes = [
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "contract", label: "Contract" },
    { value: "temporary", label: "Temporary" },
    { value: "internship", label: "Internship" },
  ];

  const experienceLevels = [
    { value: "entry-level", label: "Entry Level (0-2 years)" },
    { value: "mid-level", label: "Mid Level (3-5 years)" },
    { value: "senior-level", label: "Senior Level (6-10 years)" },
    { value: "executive", label: "Executive (10+ years)" },
  ];

  const locations = [
    { value: "Dangila", label: "Dangila" },
    { value: "Injibara", label: "Injibara" },
    { value: "Addiskidam", label: "Addiskidam" },
    { value: "Jawi", label: "Jawi" },
    { value: "other", label: "other" },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const dataToSubmit = new FormData();
    for (const key in formData) {
      if (key === "salaryMin" || key === "salaryMax") {
        if (formData[key] !== "") {
          dataToSubmit.append(key, formData[key]);
        }
      } else {
        dataToSubmit.append(key, formData[key]);
      }
    }

    try {
      if (id) {
        await updateVacancy(id, dataToSubmit, token);
        alert("Job vacancy updated successfully!");
        navigate("/admin/add-vacancy");
      } else {
        await addVacancy(dataToSubmit, token);
        alert("Job vacancy posted successfully!");
        setIsSuccess(true);
      }
      const data = await getVacancies();
      setVacancies(data);
    } catch (error) {
      console.error("Failed to save vacancy:", error);
      alert("Failed to save job vacancy. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (vacancyId) => {
    if (window.confirm("Are you sure you want to delete this vacancy?")) {
      try {
        await deleteVacancy(vacancyId, token);
        setVacancies(vacancies.filter((v) => v.id !== vacancyId));
      } catch (error) {
        console.error("Failed to delete vacancy:", error);
      }
    }
  };

  const getCurrentDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split("T")[0];
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {id ? "Edit Job Vacancy" : "Post New Job Vacancy"}
          </h1>
          <p className="text-xl text-gray-600">
            {id
              ? "Update the details for the job posting."
              : "Find the right talent for your team"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              {/* Basic Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Job Details
                </h3>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. Senior Financial Analyst"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Department *
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept.value} value={dept.value}>
                          {dept.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Location *
                    </label>
                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Location</option>
                      {locations.map((location) => (
                        <option key={location.value} value={location.value}>
                          {location.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Employment Type
                    </label>
                    <select
                      name="employmentType"
                      value={formData.employmentType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {employmentTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Experience Level
                    </label>
                    <select
                      name="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {experienceLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Vacancy Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Salary and Deadline */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Compensation & Timeline
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Minimum Salary (ETB)
                    </label>
                    <input
                      type="number"
                      name="salaryMin"
                      value={formData.salaryMin}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="15000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Maximum Salary (ETB)
                    </label>
                    <input
                      type="number"
                      name="salaryMax"
                      value={formData.salaryMax}
                      onChange={handleInputChange}
                      min={formData.salaryMin || "0"}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="25000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Application Deadline *
                    </label>
                    <input
                      type="date"
                      name="applicationDeadline"
                      value={formData.applicationDeadline}
                      onChange={handleInputChange}
                      required
                      min={getMinDate()}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Job Description
                </h3>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Job Description *
                  </label>
                  <textarea
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Provide a comprehensive overview of the role..."
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Key Responsibilities *
                  </label>
                  <textarea
                    name="responsibilities"
                    value={formData.responsibilities}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="List the main responsibilities (one per line)..."
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Requirements *
                  </label>
                  <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="List the essential requirements..."
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Preferred Qualifications
                  </label>
                  <textarea
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Additional qualifications that would be beneficial..."
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Benefits & Perks
                  </label>
                  <textarea
                    name="benefits"
                    value={formData.benefits}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Health insurance, professional development, flexible hours..."
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Contact Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Hiring Manager *
                    </label>
                    <input
                      type="text"
                      name="hiringManager"
                      value={formData.hiringManager}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Manager name..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="hr@sosser.coop"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+251-XX-XXX-XXXX"
                    />
                  </div>
                </div>

                <div className="mb-8">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="urgent"
                      checked={formData.urgent}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-900">
                      Mark as urgent hiring
                    </span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => setPreview(!preview)}
                  className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <EyeIcon className="w-5 h-5 mr-2" />
                  {preview ? "Hide Preview" : "Show Preview"}
                </button>
                <button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !formData.title ||
                    !formData.department ||
                    !formData.location ||
                    !formData.applicationDeadline ||
                    !formData.jobDescription ||
                    !formData.responsibilities ||
                    !formData.requirements ||
                    !formData.hiringManager ||
                    !formData.contactEmail
                  }
                  className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      {id ? "Updating Job..." : "Posting Job..."}
                    </>
                  ) : (
                    <>
                      <PlusIcon className="w-5 h-5 mr-2" />
                      {id ? "Update Job Vacancy" : "Post Job Vacancy"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Job Posting Tips */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <BriefcaseIcon className="w-5 h-5 mr-2 text-blue-600" />
                Posting Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  Use clear, specific job titles
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  Include salary range to attract quality candidates
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  Be specific about requirements
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  Highlight company benefits
                </li>
              </ul>
            </div>

            {/* Department Guide */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <AcademicCapIcon className="w-5 h-5 mr-2 text-blue-600" />
                Popular Departments
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Finance</span>
                  <span className="text-gray-500">12 openings</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Technology</span>
                  <span className="text-gray-500">8 openings</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Operations</span>
                  <span className="text-gray-500">6 openings</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Customer Service</span>
                  <span className="text-gray-500">4 openings</span>
                </div>
              </div>
            </div>

            {/* Recent Postings */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <ClockIcon className="w-5 h-5 mr-2 text-blue-600" />
                Existing Vacancies
              </h3>
              <div className="space-y-3">
                {isLoading ? (
                  <p>Loading vacancies...</p>
                ) : (
                  vacancies.map((vacancy) => (
                    <div
                      key={vacancy.id}
                      className="border-l-4 border-blue-500 pl-3 flex justify-between items-center"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {vacancy.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {vacancy.department}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            navigate(`/admin/add-vacancy/${vacancy.id}`)
                          }
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(vacancy.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Preview Section */}
        {preview && formData.title && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white rounded-xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <EyeIcon className="w-6 h-6 mr-2 text-blue-600" />
              Job Posting Preview
            </h3>
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    {formData.title}
                  </h4>
                  <div className="flex items-center space-x-4 text-gray-600 mb-4">
                    <span className="flex items-center">
                      <BriefcaseIcon className="w-4 h-4 mr-1" />
                      {
                        departments.find((d) => d.value === formData.department)
                          ?.label
                      }
                    </span>
                    <span className="flex items-center">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      {
                        locations.find((l) => l.value === formData.location)
                          ?.label
                      }
                    </span>
                    <span className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      {
                        employmentTypes.find(
                          (t) => t.value === formData.employmentType
                        )?.label
                      }
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  {(formData.salaryMin || formData.salaryMax) && (
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      {formData.salaryMin && formData.salaryMax
                        ? `${formData.salaryMin} - ${formData.salaryMax} ETB`
                        : formData.salaryMin
                        ? `From ${formData.salaryMin} ETB`
                        : `Up to ${formData.salaryMax} ETB`}
                    </div>
                  )}
                  {formData.urgent && (
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      Urgent Hiring
                    </span>
                  )}
                </div>
              </div>

              {formData.jobDescription && (
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-2">
                    Job Description
                  </h5>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {formData.jobDescription}
                  </p>
                </div>
              )}

              {formData.responsibilities && (
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-2">
                    Key Responsibilities
                  </h5>
                  <div className="text-gray-700 whitespace-pre-wrap">
                    {formData.responsibilities}
                  </div>
                </div>
              )}

              {formData.requirements && (
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-2">
                    Requirements
                  </h5>
                  <div className="text-gray-700 whitespace-pre-wrap">
                    {formData.requirements}
                  </div>
                </div>
              )}

              {formData.qualifications && (
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-2">
                    Preferred Qualifications
                  </h5>
                  <div className="text-gray-700 whitespace-pre-wrap">
                    {formData.qualifications}
                  </div>
                </div>
              )}

              {formData.benefits && (
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-2">
                    Benefits & Perks
                  </h5>
                  <div className="text-gray-700 whitespace-pre-wrap">
                    {formData.benefits}
                  </div>
                </div>
              )}

              <div className="border-t pt-4 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <p>
                    <strong>Hiring Manager:</strong> {formData.hiringManager}
                  </p>
                  <p>
                    <strong>Contact:</strong> {formData.contactEmail}
                  </p>
                  {formData.contactPhone && (
                    <p>
                      <strong>Phone:</strong> {formData.contactPhone}
                    </p>
                  )}
                </div>
                {formData.applicationDeadline && (
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      Application Deadline
                    </p>
                    <p className="font-semibold text-gray-900">
                      {formData.applicationDeadline}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AddVacancy;
