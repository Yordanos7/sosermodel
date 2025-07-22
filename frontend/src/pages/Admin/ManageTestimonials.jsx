import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  PencilIcon,
  TrashIcon,
  UserIcon,
  MapPinIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../../api/testimonial";

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    category: "",
    loanAmount: "",
    businessType: "",
    story: "",
    impact: "",
    rating: 5,
    featured: false,
    year: "",
    image: null,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await getTestimonials();
      setTestimonials(response.testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const testimonialData = new FormData();
    for (const key in formData) {
      testimonialData.append(key, formData[key]);
    }

    try {
      if (currentTestimonial) {
        await updateTestimonial(currentTestimonial.id, testimonialData);
      } else {
        await createTestimonial(testimonialData);
      }
      fetchTestimonials();
      closeModal();
    } catch (error) {
      console.error("Error saving testimonial:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      try {
        await deleteTestimonial(id);
        fetchTestimonials();
      } catch (error) {
        console.error("Error deleting testimonial:", error);
      }
    }
  };

  const openModal = (testimonial = null) => {
    setCurrentTestimonial(testimonial);
    if (testimonial) {
      setFormData({
        name: testimonial.name,
        location: testimonial.location,
        category: testimonial.category,
        loanAmount: testimonial.loanAmount,
        businessType: testimonial.businessType,
        story: testimonial.story,
        impact: testimonial.impact,
        rating: testimonial.rating,
        featured: testimonial.featured,
        year: testimonial.year,
        image: null,
      });
    } else {
      setFormData({
        name: "",
        location: "",
        category: "",
        loanAmount: "",
        businessType: "",
        story: "",
        impact: "",
        rating: 5,
        featured: false,
        year: "",
        image: null,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTestimonial(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Manage Testimonials
          </h1>
          <button
            onClick={() => openModal()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Testimonial
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <img
                src={`http://localhost:5000/${testimonial.image}`}
                alt={testimonial.name}
                className="w-full h-32 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-bold text-gray-900">
                {testimonial.name}
              </h3>
              <p className="text-sm text-gray-500">
                {testimonial.businessType}
              </p>
              <div className="flex items-center mt-2">
                <StarIcon className="w-5 h-5 text-yellow-400" />
                <span className="ml-1">{testimonial.rating}</span>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => openModal(testimonial)}
                  className="p-2 text-blue-600 hover:text-blue-800"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(testimonial.id)}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {currentTestimonial ? "Edit" : "Add"} Testimonial
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Location"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Category"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleInputChange}
                  placeholder="Loan Amount"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  placeholder="Business Type"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  placeholder="Rating"
                  className="w-full p-2 border rounded"
                  min="1"
                  max="5"
                />
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  placeholder="Year"
                  className="w-full p-2 border rounded"
                />
              </div>
              <textarea
                name="story"
                value={formData.story}
                onChange={handleInputChange}
                placeholder="Story"
                className="w-full p-2 border rounded"
                rows="4"
                required
              ></textarea>
              <textarea
                name="impact"
                value={formData.impact}
                onChange={handleInputChange}
                placeholder="Impact"
                className="w-full p-2 border rounded"
                rows="2"
              ></textarea>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="w-full p-2 border rounded"
              />
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label>Featured</label>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTestimonials;
