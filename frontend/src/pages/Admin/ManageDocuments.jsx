import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  PencilIcon,
  TrashIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import {
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  downloadDocument,
} from "../../api/document";
import { saveAs } from "file-saver";

const ManageDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    size: "",
    pages: "",
    publishDate: "",
    category: "",
    featured: false,
    file: null,
  });

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await getDocuments();
      setDocuments(response.documents);
    } catch (error) {
      console.error("Error fetching documents:", error);
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
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const documentData = new FormData();
    for (const key in formData) {
      documentData.append(key, formData[key]);
    }

    try {
      if (currentDocument) {
        await updateDocument(currentDocument.id, documentData);
      } else {
        await createDocument(documentData);
      }
      fetchDocuments();
      closeModal();
    } catch (error) {
      console.error("Error saving document:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      try {
        await deleteDocument(id);
        fetchDocuments();
      } catch (error) {
        console.error("Error deleting document:", error);
      }
    }
  };

  const handleDownload = async (id, title) => {
    try {
      const blob = await downloadDocument(id);
      saveAs(blob, title);
      fetchDocuments();
    } catch (error) {
      console.error("Error downloading document:", error);
    }
  };

  const openModal = (document = null) => {
    setCurrentDocument(document);
    if (document) {
      setFormData({
        title: document.title,
        type: document.type,
        description: document.description,
        size: document.size,
        pages: document.pages,
        publishDate: document.publishDate
          ? new Date(document.publishDate).toISOString().split("T")[0]
          : "",
        category: document.category,
        featured: document.featured,
        file: null,
      });
    } else {
      setFormData({
        title: "",
        type: "",
        description: "",
        size: "",
        pages: "",
        publishDate: "",
        category: "",
        featured: false,
        file: null,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentDocument(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Documents</h1>
          <button
            onClick={() => openModal()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Document
          </button>
        </div>

        <div className="space-y-4">
          {documents.map((document) => (
            <motion.div
              key={document.id}
              className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <DocumentTextIcon className="w-8 h-8 text-blue-600" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {document.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {document.category} - {document.type}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">
                  {document.downloads} downloads
                </span>
                <button
                  onClick={() => handleDownload(document.id, document.title)}
                  className="p-2 text-green-600 hover:text-green-800"
                >
                  <ArrowDownTrayIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => openModal(document)}
                  className="p-2 text-blue-600 hover:text-blue-800"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(document.id)}
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
              {currentDocument ? "Edit" : "Add"} Document
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Title"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  placeholder="Type"
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
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  placeholder="Size (e.g., 2.5 MB)"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="number"
                  name="pages"
                  value={formData.pages}
                  onChange={handleInputChange}
                  placeholder="Pages"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="date"
                  name="publishDate"
                  value={formData.publishDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="w-full p-2 border rounded"
                rows="3"
              ></textarea>
              <input
                type="file"
                name="file"
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

export default ManageDocuments;
