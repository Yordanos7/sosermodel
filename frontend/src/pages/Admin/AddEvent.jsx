import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  PlusIcon,
  CalendarDaysIcon,
  MapPinIcon,
  UserGroupIcon,
  EyeIcon,
  CheckCircleIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import api from "../../lib/axios";
import { useAuth } from "../../context/AuthContext";

const AddEvent = () => {
  const { getAuthToken } = useAuth();
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventType: "workshop",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    capacity: "",
    registrationRequired: true,
    registrationDeadline: "",
    cost: "",
    organizer: "",
    contactEmail: "",
    contactPhone: "",
    tags: "",
    requirements: "",
    featured: false,
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [preview, setPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await api.get("/events");
      setEvents(response.data.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const eventTypes = [
    { value: "workshop", label: "Workshop" },
    { value: "seminar", label: "Seminar" },
    { value: "training", label: "Training Session" },
    { value: "meeting", label: "Meeting" },
    { value: "conference", label: "Conference" },
    { value: "webinar", label: "Webinar" },
    { value: "networking", label: "Networking Event" },
    { value: "celebration", label: "Celebration" },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = getAuthToken();

    try {
      const formDataToSend = new FormData();

      // Append all form fields
      for (const [key, value] of Object.entries(formData)) {
        if (value !== null && value !== undefined) {
          formDataToSend.append(key, value);
        }
      }

      // Append image if exists
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      let response;
      if (isEditing) {
        response = await api.put(`/events/${currentEventId}`, formDataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        response = await api.post("/events", formDataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      if (response.status === 200 || response.status === 201) {
        alert(`Event ${isEditing ? "updated" : "created"} successfully!`);
        fetchEvents();
        resetForm();
      }
    } catch (error) {
      console.error("Error saving event:", error);
      alert(
        `Failed to save event: ${
          error.response?.data?.message || error.message
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (event) => {
    setFormData({
      title: event.title,
      description: event.description,
      eventType: event.eventType,
      date: event.date ? new Date(event.date).toISOString().split("T")[0] : "",
      startTime: event.startTime,
      endTime: event.endTime,
      location: event.location,
      capacity: event.capacity,
      registrationRequired: event.registrationRequired,
      registrationDeadline: event.registrationDeadline
        ? new Date(event.registrationDeadline).toISOString().split("T")[0]
        : "",
      cost: event.cost,
      organizer: event.organizer,
      contactEmail: event.contactEmail,
      contactPhone: event.contactPhone,
      tags: event.tags,
      requirements: event.requirements,
      featured: event.featured,
    });

    if (event.image) {
      setPreviewImage(`${window.location.origin}/${event.image}`);
    } else {
      setPreviewImage(null);
    }

    setCurrentEventId(event.id);
    setIsEditing(true);
    setImageFile(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const token = getAuthToken();
      try {
        const response = await api.delete(`/events/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          alert("Event deleted successfully!");
          fetchEvents();
        }
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Failed to delete event.");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      eventType: "workshop",
      date: "",
      startTime: "",
      endTime: "",
      location: "",
      capacity: "",
      registrationRequired: true,
      registrationDeadline: "",
      cost: "",
      organizer: "",
      contactEmail: "",
      contactPhone: "",
      tags: "",
      requirements: "",
      featured: false,
    });
    setImageFile(null);
    setPreviewImage(null);
    setCurrentEventId(null);
    setIsEditing(false);
  };

  const getCurrentDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  const formatDateTime = (date, time) => {
    if (!date || !time) return "";
    return new Date(`${date}T${time}`).toLocaleString();
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
            {isEditing ? "Edit Event" : "Create New Event"}
          </h1>
          <p className="text-xl text-gray-600">
            Organize and promote events for your community
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
              encType="multipart/form-data"
            >
              {/* Basic Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Basic Information
                </h3>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter event title..."
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe your event..."
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Event Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {previewImage && (
                    <div className="mt-2">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Event Type
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {eventTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    id="featured"
                    name="featured"
                    type="checkbox"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="featured"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Featured Event
                  </label>
                </div>
              </div>

              {/* Rest of your form remains the same */}
              {/* ... */}

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
                    isSubmitting || !formData.title || !formData.description
                  }
                  className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      {isEditing ? "Updating Event..." : "Creating Event..."}
                    </>
                  ) : (
                    <>
                      <PlusIcon className="w-5 h-5 mr-2" />
                      {isEditing ? "Update Event" : "Create Event"}
                    </>
                  )}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </motion.div>

          {/* Rest of your component remains the same */}
          {/* ... */}
        </div>

        {/* Preview Section */}
        {preview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white rounded-xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <EyeIcon className="w-6 h-6 mr-2 text-blue-600" />
              Event Preview
            </h3>
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    {formData.title || "Event Title"}
                  </h4>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {eventTypes.find((t) => t.value === formData.eventType)
                      ?.label || "Workshop"}
                  </span>
                </div>
                {formData.cost && (
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">
                      {formData.cost} ETB
                    </p>
                    <p className="text-sm text-gray-500">Registration Fee</p>
                  </div>
                )}
              </div>

              {previewImage && (
                <div className="mb-6">
                  <img
                    src={previewImage}
                    alt="Event Preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Rest of your preview section */}
              {/* ... */}
            </div>
          </motion.div>
        )}

        {/* Events List */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Manage Events
          </h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.map((event) => (
                  <tr key={event.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {event.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(event.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleEdit(event)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
