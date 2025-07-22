import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  PlusIcon,
  DocumentTextIcon,
  TagIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  PaperClipIcon,
  PencilIcon,
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext";

const AddAnnouncement = () => {
  const { getAuthToken } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "general",
    priority: "medium",
    publishDate: "",
    expiryDate: "",
    targetAudience: "all",
    tags: "",
    attachments: [],
  });
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [preview, setPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);

  const categories = [
    { value: "general", label: "General Announcement" },
    { value: "service", label: "Service Update" },
    { value: "policy", label: "Policy Change" },
    { value: "system", label: "System Maintenance" },
    { value: "promotion", label: "Promotion/Offer" },
    { value: "event", label: "Event Notification" },
  ];

  const priorities = [
    { value: "low", label: "Low", color: "bg-gray-100 text-gray-800" },
    { value: "medium", label: "Medium", color: "bg-blue-100 text-blue-800" },
    { value: "high", label: "High", color: "bg-yellow-100 text-yellow-800" },
    { value: "urgent", label: "Urgent", color: "bg-red-100 text-red-800" },
  ];

  const audiences = [
    { value: "all", label: "All Members" },
    { value: "individual", label: "Individual Customers" },
    { value: "business", label: "Business Customers" },
    { value: "staff", label: "Staff Only" },
    { value: "partners", label: "Partners" },
  ];

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setIsLoading(true);
    try {
      const token = getAuthToken();
      if (!token)
        throw new Error("No authentication token found. Please log in.");
      const res = await fetch("http://localhost:5000/api/announcements", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch announcements");
      const data = await res.json();
      setAnnouncements(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const sortAnnouncements = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedAnnouncements = [...announcements].sort((a, b) => {
      if (key === "title") {
        return direction === "ascending"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (key === "category") {
        return direction === "ascending"
          ? a.category.localeCompare(b.category)
          : b.category.localeCompare(a.category);
      } else if (key === "priority") {
        return direction === "ascending"
          ? a.priority.localeCompare(b.priority)
          : b.priority.localeCompare(a.priority);
      } else if (key === "publishDate") {
        return direction === "ascending"
          ? new Date(a.publishDate) - new Date(b.publishDate)
          : new Date(b.publishDate) - new Date(a.publishDate);
      }
      return 0;
    });
    setAnnouncements(sortedAnnouncements);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, attachments: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = new FormData();
    form.append("title", formData.title);
    form.append("content", formData.content);
    form.append("category", formData.category);
    form.append("priority", formData.priority);
    if (formData.publishDate) form.append("publishDate", formData.publishDate);
    if (formData.expiryDate) form.append("expiryDate", formData.expiryDate);
    form.append("targetAudience", formData.targetAudience);
    if (formData.tags) form.append("tags", formData.tags);
    formData.attachments.forEach((file) => form.append("attachments", file));

    try {
      const token = getAuthToken();
      const url = editingAnnouncement
        ? `http://localhost:5000/api/announcements/${editingAnnouncement.id}`
        : "http://localhost:5000/api/announcements";
      const method = editingAnnouncement ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to submit announcement");

      setIsSubmitting(false);
      await fetchAnnouncements();
      alert(
        editingAnnouncement
          ? "Announcement updated successfully!"
          : "Announcement published successfully!"
      );
      resetForm();
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?"))
      return;
    try {
      const token = getAuthToken();
      const res = await fetch(`http://localhost:5000/api/announcements/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete announcement");
      await fetchAnnouncements();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditAnnouncement = (announcement) => {
    setFormData({
      title: announcement.title,
      content: announcement.content,
      category: announcement.category,
      priority: announcement.priority,
      publishDate: announcement.publishDate
        ? announcement.publishDate.split("T")[0]
        : "",
      expiryDate: announcement.expiryDate
        ? announcement.expiryDate.split("T")[0]
        : "",
      targetAudience: announcement.targetAudience,
      tags: announcement.tags || "",
      attachments: [],
    });
    setEditingAnnouncement(announcement);
  };

  const handleViewImage = (attachment) => {
    setSelectedImage(`http://localhost:5000/${attachment}`);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      category: "general",
      priority: "medium",
      publishDate: "",
      expiryDate: "",
      targetAudience: "all",
      tags: "",
      attachments: [],
    });
    setEditingAnnouncement(null);
    setPreview(false);
  };

  const getCurrentDate = () => new Date().toISOString().split("T")[0];

  const toggleMobileDropdown = (id) => {
    setMobileDropdownOpen(mobileDropdownOpen === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Announcement Management
          </h1>
          <p className="text-xl text-gray-600">
            Create, edit, and manage announcements for your audience
          </p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center"
          >
            <XCircleIcon className="w-6 h-6 mr-2" />
            <span>{error}</span>
            {error.includes("Please log in") && (
              <a href="/login" className="ml-2 text-blue-600 hover:underline">
                Log in
              </a>
            )}
          </motion.div>
        )}

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {editingAnnouncement
              ? "Edit Announcement"
              : "Create New Announcement"}
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Announcement Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter announcement title..."
              />
            </div>

            {/* Content */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Content *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your announcement content here..."
              />
            </div>

            {/* Category and Priority */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {priorities.map((priority) => (
                    <option key={priority.value} value={priority.value}>
                      {priority.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Publish Date
                </label>
                <input
                  type="date"
                  name="publishDate"
                  value={formData.publishDate}
                  onChange={handleInputChange}
                  min={getCurrentDate()}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Expiry Date
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  min={formData.publishDate || getCurrentDate()}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Target Audience and Tags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Target Audience
                </label>
                <select
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {audiences.map((audience) => (
                    <option key={audience.value} value={audience.value}>
                      {audience.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., update, urgent, system"
                />
              </div>
            </div>

            {/* File Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Attachments (Images/PDFs, max 5)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <PaperClipIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <input
                  type="file"
                  multiple
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="attachment-upload"
                />
                <label
                  htmlFor="attachment-upload"
                  className="cursor-pointer text-blue-600 hover:text-blue-700"
                >
                  Click to upload files
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  JPG, PNG, GIF, PDF up to 10MB
                </p>
                {formData.attachments.length > 0 && (
                  <div className="mt-2 text-sm text-gray-600">
                    {formData.attachments.map((file, index) => (
                      <p key={index}>✓ {file.name}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {editingAnnouncement && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <XCircleIcon className="w-5 h-5 mr-2" />
                  Cancel
                </button>
              )}
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
                disabled={isSubmitting || !formData.title || !formData.content}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {editingAnnouncement ? "Updating..." : "Publishing..."}
                  </>
                ) : (
                  <>
                    <PlusIcon className="w-5 h-5 mr-2" />
                    {editingAnnouncement
                      ? "Update Announcement"
                      : "Publish Announcement"}
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Preview Section */}
        {preview && formData.title && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-white rounded-xl shadow-lg p-6 md:p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <EyeIcon className="w-6 h-6 mr-2 text-blue-600" />
              Preview
            </h3>
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                <h4 className="text-xl font-bold text-gray-900">
                  {formData.title}
                </h4>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    priorities.find((p) => p.value === formData.priority)?.color
                  }`}
                >
                  {priorities.find((p) => p.value === formData.priority)?.label}
                </span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0 mb-4 text-sm text-gray-600">
                <span>
                  Category:{" "}
                  {categories.find((c) => c.value === formData.category)?.label}
                </span>
                <span className="hidden md:inline">•</span>
                <span>
                  Audience:{" "}
                  {
                    audiences.find((a) => a.value === formData.targetAudience)
                      ?.label
                  }
                </span>
                <span className="hidden md:inline">•</span>
                {formData.publishDate && (
                  <>
                    <span>Publish: {formData.publishDate}</span>
                  </>
                )}
                {formData.expiryDate && (
                  <>
                    <span className="hidden md:inline">•</span>
                    <span>Expires: {formData.expiryDate}</span>
                  </>
                )}
              </div>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {formData.content}
                </p>
              </div>
              {formData.tags && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {formData.tags.split(",").map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              )}
              {formData.attachments.length > 0 && (
                <div className="mt-4">
                  <h5 className="text-sm font-medium text-gray-900 mb-2">
                    Attachments
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {formData.attachments.map((file, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm"
                      >
                        {file.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Management Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 md:p-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Manage Announcements
          </h2>
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : !announcements || announcements.length === 0 ? (
            <p className="text-gray-600 text-center py-6">
              No announcements available.
            </p>
          ) : (
            <div className="overflow-x-auto">
              {/* Desktop Table */}
              <table className="w-full border-collapse hidden md:table">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th
                      className="border p-4 text-left font-semibold cursor-pointer"
                      onClick={() => sortAnnouncements("title")}
                    >
                      Title{" "}
                      {sortConfig.key === "title" &&
                        (sortConfig.direction === "ascending" ? (
                          <ChevronUpIcon className="w-4 h-4 inline" />
                        ) : (
                          <ChevronDownIcon className="w-4 h-4 inline" />
                        ))}
                    </th>
                    <th
                      className="border p-4 text-left font-semibold cursor-pointer"
                      onClick={() => sortAnnouncements("category")}
                    >
                      Category{" "}
                      {sortConfig.key === "category" &&
                        (sortConfig.direction === "ascending" ? (
                          <ChevronUpIcon className="w-4 h-4 inline" />
                        ) : (
                          <ChevronDownIcon className="w-4 h-4 inline" />
                        ))}
                    </th>
                    <th
                      className="border p-4 text-left font-semibold cursor-pointer"
                      onClick={() => sortAnnouncements("priority")}
                    >
                      Priority{" "}
                      {sortConfig.key === "priority" &&
                        (sortConfig.direction === "ascending" ? (
                          <ChevronUpIcon className="w-4 h-4 inline" />
                        ) : (
                          <ChevronDownIcon className="w-4 h-4 inline" />
                        ))}
                    </th>
                    <th
                      className="border p-4 text-left font-semibold cursor-pointer"
                      onClick={() => sortAnnouncements("publishDate")}
                    >
                      Publish Date{" "}
                      {sortConfig.key === "publishDate" &&
                        (sortConfig.direction === "ascending" ? (
                          <ChevronUpIcon className="w-4 h-4 inline" />
                        ) : (
                          <ChevronDownIcon className="w-4 h-4 inline" />
                        ))}
                    </th>
                    <th className="border p-4 text-left font-semibold">
                      Posted By
                    </th>
                    <th className="border p-4 text-left font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {announcements.map((a) => (
                    <tr
                      key={a.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="border p-4">{a.title}</td>
                      <td className="border p-4">{a.category}</td>
                      <td className="border p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            a.priority === "urgent"
                              ? "bg-red-100 text-red-800"
                              : a.priority === "high"
                              ? "bg-yellow-100 text-yellow-800"
                              : a.priority === "medium"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {a.priority.charAt(0).toUpperCase() +
                            a.priority.slice(1)}
                        </span>
                      </td>
                      <td className="border p-4">
                        {new Date(a.publishDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </td>
                      <td className="border p-4">
                        {a.user?.name || a.postedBy}
                        <br />
                        <span className="text-sm text-gray-500">
                          {a.user?.email || "N/A"}
                        </span>
                      </td>
                      <td className="border p-4">
                        <div className="flex flex-wrap gap-2">
                          <button
                            className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center"
                            onClick={() =>
                              alert(
                                `ID: ${a.id}\nTitle: ${a.title}\nContent: ${
                                  a.content
                                }\nCategory: ${a.category}\nPriority: ${
                                  a.priority
                                }\nPublish Date: ${new Date(
                                  a.publishDate
                                ).toLocaleDateString("en-US")}\nExpiry Date: ${
                                  a.expiryDate
                                    ? new Date(a.expiryDate).toLocaleDateString(
                                        "en-US"
                                      )
                                    : "N/A"
                                }\nAudience: ${a.targetAudience}\nTags: ${
                                  a.tags || "N/A"
                                }\nAttachments: ${a.attachments || "N/A"}`
                              )
                            }
                          >
                            <EyeIcon className="w-3.5 h-3.5 inline-block mr-1" />
                            Details
                          </button>
                          {a.attachments && (
                            <button
                              className="bg-purple-600 text-white px-3 py-1.5 rounded-lg hover:bg-purple-700 transition-colors text-sm flex items-center"
                              onClick={() =>
                                handleViewImage(a.attachments.split(",")[0])
                              }
                            >
                              <PaperClipIcon className="w-3.5 h-3.5 inline-block mr-1" />
                              Attachment
                            </button>
                          )}
                          <button
                            className="bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center"
                            onClick={() => handleEditAnnouncement(a)}
                          >
                            <PencilIcon className="w-3.5 h-3.5 inline-block mr-1" />
                            Edit
                          </button>
                          <button
                            className="bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 transition-colors text-sm flex items-center"
                            onClick={() => handleDeleteAnnouncement(a.id)}
                          >
                            <TrashIcon className="w-3.5 h-3.5 inline-block mr-1" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile List */}
              <div className="md:hidden space-y-4">
                {announcements.map((a) => (
                  <div
                    key={a.id}
                    className="border rounded-lg p-4 bg-white shadow-sm"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{a.title}</h3>
                        <div className="flex items-center mt-1">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs ${
                              a.priority === "urgent"
                                ? "bg-red-100 text-red-800"
                                : a.priority === "high"
                                ? "bg-yellow-100 text-yellow-800"
                                : a.priority === "medium"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {a.priority.charAt(0).toUpperCase() +
                              a.priority.slice(1)}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">
                            {a.category}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleMobileDropdown(a.id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        {mobileDropdownOpen === a.id ? (
                          <ChevronUpIcon className="w-5 h-5" />
                        ) : (
                          <ChevronDownIcon className="w-5 h-5" />
                        )}
                      </button>
                    </div>

                    {mobileDropdownOpen === a.id && (
                      <div className="mt-3 pt-3 border-t">
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>
                            <span className="font-medium">Posted:</span>{" "}
                            {new Date(a.publishDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </p>
                          <p>
                            <span className="font-medium">By:</span>{" "}
                            {a.user?.name || a.postedBy}
                          </p>
                          <p>
                            <span className="font-medium">Audience:</span>{" "}
                            {
                              audiences.find(
                                (aud) => aud.value === a.targetAudience
                              )?.label
                            }
                          </p>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          <button
                            className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors text-xs flex items-center"
                            onClick={() =>
                              alert(
                                `ID: ${a.id}\nTitle: ${a.title}\nContent: ${
                                  a.content
                                }\nCategory: ${a.category}\nPriority: ${
                                  a.priority
                                }\nPublish Date: ${new Date(
                                  a.publishDate
                                ).toLocaleDateString("en-US")}\nExpiry Date: ${
                                  a.expiryDate
                                    ? new Date(a.expiryDate).toLocaleDateString(
                                        "en-US"
                                      )
                                    : "N/A"
                                }\nAudience: ${a.targetAudience}\nTags: ${
                                  a.tags || "N/A"
                                }\nAttachments: ${a.attachments || "N/A"}`
                              )
                            }
                          >
                            <EyeIcon className="w-3 h-3 inline-block mr-1" />
                            Details
                          </button>
                          {a.attachments && (
                            <button
                              className="bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700 transition-colors text-xs flex items-center"
                              onClick={() =>
                                handleViewImage(a.attachments.split(",")[0])
                              }
                            >
                              <PaperClipIcon className="w-3 h-3 inline-block mr-1" />
                              Attachment
                            </button>
                          )}
                          <button
                            className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors text-xs flex items-center"
                            onClick={() => handleEditAnnouncement(a)}
                          >
                            <PencilIcon className="w-3 h-3 inline-block mr-1" />
                            Edit
                          </button>
                          <button
                            className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-colors text-xs flex items-center"
                            onClick={() => handleDeleteAnnouncement(a.id)}
                          >
                            <TrashIcon className="w-3 h-3 inline-block mr-1" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Image Modal */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-2xl p-4 max-w-3xl w-full mx-4 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                onClick={closeModal}
              >
                <XCircleIcon className="w-8 h-8" />
              </button>
              <img
                src={selectedImage}
                alt="Attachment"
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
            </div>
          </motion.div>
        )}

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 space-y-6"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <DocumentTextIcon className="w-5 h-5 mr-2 text-blue-600" />
              Writing Tips
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                Keep titles clear and concise
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                Use active voice for better engagement
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                Include relevant dates and deadlines
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                Proofread before publishing
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TagIcon className="w-5 h-5 mr-2 text-blue-600" />
              Priority Levels
            </h3>
            <div className="space-y-3">
              {priorities.map((priority) => (
                <div
                  key={priority.value}
                  className="flex items-center justify-between"
                >
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${priority.color}`}
                  >
                    {priority.label}
                  </span>
                  <span className="text-xs text-gray-500">
                    {priority.value === "urgent" && "Immediate attention"}
                    {priority.value === "high" && "Important notice"}
                    {priority.value === "medium" && "Standard update"}
                    {priority.value === "low" && "General info"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Footer */}
      </div>
    </div>
  );
};

export default AddAnnouncement;
