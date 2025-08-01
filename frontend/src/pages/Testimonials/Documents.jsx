import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  DocumentTextIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  CalendarDaysIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { saveAs } from "file-saver";
import { getDocuments, downloadDocument } from "../../api/document";

const Documents = () => {
  const { t, i18n } = useTranslation();
  const [documents, setDocuments] = useState([]);
  const [downloadingDocId, setDownloadingDocId] = useState(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all_documents");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [viewingImage, setViewingImage] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await getDocuments();
        setDocuments(response.documents);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  const handleDownload = async (id, title) => {
    setDownloadingDocId(id);
    setDownloadProgress(0);
    try {
      const doc = documents.find((d) => d.id === id);
      const fileExtension = doc.filePath.split(".").pop();
      const fileName = `${title}.${fileExtension}`;
      const response = await downloadDocument(id, (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setDownloadProgress(percentCompleted);
      });
      saveAs(new Blob([response]), fileName);
    } catch (error) {
      console.error("Error downloading document:", error);
    } finally {
      setDownloadingDocId(null);
      setDownloadProgress(0);
    }
  };

  const categories = [
    {
      name: t("documents.categories.all_documents"),
      id: "all_documents",
      count: documents.length,
    },
    {
      name: t("documents.categories.financial_reports"),
      id: "financial_reports",
      count: documents.filter(
        (doc) => doc.category === t("documents.categories.financial_reports")
      ).length,
    },
    {
      name: t("documents.categories.impact_studies"),
      id: "impact_studies",
      count: documents.filter(
        (doc) => doc.category === t("documents.categories.impact_studies")
      ).length,
    },
    {
      name: t("documents.categories.case_studies"),
      id: "case_studies",
      count: documents.filter(
        (doc) => doc.category === t("documents.categories.case_studies")
      ).length,
    },
    {
      name: t("documents.categories.esg_reports"),
      id: "esg_reports",
      count: documents.filter(
        (doc) => doc.category === t("documents.categories.esg_reports")
      ).length,
    },
  ];

  const filteredDocuments =
    activeCategory === "all_documents"
      ? documents
      : documents.filter(
          (doc) => doc.category === t(`documents.categories.${activeCategory}`)
        );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(i18n.language, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDownloads = (downloads) => {
    if (downloads >= 1000) {
      return `${(downloads / 1000).toFixed(1)}k`;
    }
    return downloads.toString();
  };

  // Image viewing modal
  const ImageModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="relative w-full max-w-4xl">
        <button
          onClick={() => setViewingImage(null)}
          className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2 text-xs sm:text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 sm:h-6 w-4 sm:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <img
          src={viewingImage}
          alt={t("documents.actions.preview")}
          className="max-h-[80vh] max-w-full mx-auto object-contain rounded-md sm:rounded-lg"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-4 lg:pt-8 w-full overflow-x-hidden mt-24">
      {viewingImage && <ImageModal />}

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
            {t("documents.header.title")}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            {t("documents.header.description")}
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-6 mb-4 sm:mb-8 md:mb-12"
        >
          <div className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg p-2 sm:p-4 md:p-6 text-center">
            <DocumentTextIcon className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600 mx-auto mb-1 sm:mb-2" />
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
              {documents.length}
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">
              {t("documents.statistics.total_documents")}
            </p>
          </div>
          <div className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg p-2 sm:p-4 md:p-6 text-center">
            <ArrowDownTrayIcon className="w-6 sm:w-8 h-6 sm:h-8 text-green-600 mx-auto mb-1 sm:mb-2" />
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
              {formatDownloads(
                documents.reduce((total, doc) => total + doc.downloads, 0)
              )}
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">
              {t("documents.statistics.total_downloads")}
            </p>
          </div>
          <div className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg p-2 sm:p-4 md:p-6 text-center">
            <ChartBarIcon className="w-6 sm:w-8 h-6 sm:h-8 text-purple-600 mx-auto mb-1 sm:mb-2" />
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
              {categories.length - 1}
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">
              {t("documents.statistics.categories")}
            </p>
          </div>
          <div className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg p-2 sm:p-4 md:p-6 text-center">
            <CalendarDaysIcon className="w-6 sm:w-8 h-6 sm:h-8 text-red-600 mx-auto mb-1 sm:mb-2" />
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
              {new Date().getFullYear()}
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">
              {t("documents.statistics.latest_year")}
            </p>
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-8 md:mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-2 sm:px-4 md:px-6 py-1 sm:py-2 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-200 whitespace-nowrap ${
                activeCategory === category.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {isMobile
                ? `${category.name.split(" ")[0]} (${category.count})`
                : `${category.name} (${category.count})`}
            </button>
          ))}
        </motion.div>

        {/* Featured Documents */}
        {filteredDocuments.filter((doc) => doc.featured).length > 0 && (
          <div className="mb-4 sm:mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-4 md:mb-6">
              {t("documents.featured_documents.title")}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {filteredDocuments
                .filter((doc) => doc.featured)
                .slice(0, 2)
                .map((document, index) => (
                  <motion.div
                    key={document.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
                  >
                    {/* Document Image */}
                    {document.imageUrl && (
                      <div
                        className="relative h-48 sm:h-56 w-full cursor-pointer overflow-hidden"
                        onClick={() => setViewingImage(document.imageUrl)}
                      >
                        <img
                          src={document.imageUrl}
                          alt={document.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-2 sm:p-4">
                          <span className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                            {document.type}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="p-2 sm:p-4 md:p-6 flex-grow flex flex-col">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-2 sm:mb-3 line-clamp-2">
                        {document.title}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-2 sm:mb-4 md:mb-6 flex-grow line-clamp-3">
                        {document.description}
                      </p>

                      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-4 md:mb-6">
                        <div>
                          <p className="text-xs sm:text-sm text-gray-500">
                            {t("documents.job_listings.file_size")}
                          </p>
                          <p className="font-medium text-gray-800 text-xs sm:text-sm md:text-base">
                            {document.size}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-gray-500">
                            {t("documents.job_listings.pages")}
                          </p>
                          <p className="font-medium text-gray-800 text-xs sm:text-sm md:text-base">
                            {document.pages}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-gray-500">
                            {t("documents.job_listings.published")}
                          </p>
                          <p className="font-medium text-gray-800 text-xs sm:text-sm md:text-base">
                            {formatDate(document.publishDate)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-gray-500">
                            {t("documents.job_listings.downloads")}
                          </p>
                          <p className="font-medium text-gray-800 text-xs sm:text-sm md:text-base">
                            {formatDownloads(document.downloads)}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 md:space-x-3">
                        <button
                          onClick={() =>
                            handleDownload(document.id, document.title)
                          }
                          disabled={downloadingDocId === document.id}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 text-white py-2 sm:py-3 rounded-md sm:rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200 flex items-center justify-center disabled:opacity-50 text-xs sm:text-sm md:text-base"
                        >
                          {downloadingDocId === document.id ? (
                            t("documents.actions.downloading", {
                              progress: downloadProgress,
                            })
                          ) : (
                            <>
                              <ArrowDownTrayIcon className="w-4 sm:w-5 h-4 sm:h-5 mr-1 sm:mr-2" />
                              {t("documents.actions.download")}
                            </>
                          )}
                        </button>
                        <button
                          className="border-2 border-gray-300 text-gray-600 px-2 sm:px-4 md:px-6 py-2 sm:py-3 rounded-md sm:rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-200 flex items-center justify-center text-xs sm:text-sm md:text-base"
                          onClick={() =>
                            document.imageUrl &&
                            setViewingImage(document.imageUrl)
                          }
                        >
                          <EyeIcon className="w-4 sm:w-5 h-4 sm:h-5 mr-1 sm:mr-2" />
                          {t("documents.actions.preview")}
                        </button>
                      </div>
                      {downloadingDocId === document.id && (
                        <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 md:h-2.5 mt-2 sm:mt-3 md:mt-4">
                          <div
                            className="bg-blue-600 h-1.5 sm:h-2 md:h-2.5 rounded-full"
                            style={{ width: `${downloadProgress}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        {/* All Documents */}
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-4 md:mb-6">
            {activeCategory === "all_documents"
              ? t("documents.categories.all_documents")
              : t(`documents.categories.${activeCategory}`)}
          </h2>
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((document, index) => (
                <motion.div
                  key={document.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image thumbnail */}
                    {document.imageUrl && (
                      <div
                        className="md:w-32 sm:md-40 flex-shrink-0 cursor-pointer"
                        onClick={() => setViewingImage(document.imageUrl)}
                      >
                        <img
                          src={document.imageUrl}
                          alt={document.title}
                          className="w-full h-32 sm:h-40 md:h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex-1 p-2 sm:p-4 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 sm:gap-4">
                        <div className="flex items-start space-x-2 sm:space-x-3 md:space-x-4 flex-1">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col md:flex-row md:items-center md:space-x-2 sm:space-x-3 space-y-1 md:space-y-0 mb-1 sm:mb-2">
                              <h3 className="text-base sm:text-lg font-bold text-gray-800 line-clamp-2">
                                {document.title}
                              </h3>
                              <div className="flex items-center space-x-1 sm:space-x-2">
                                {document.featured && (
                                  <span className="text-yellow-500 text-xs sm:text-sm">
                                    ⭐
                                  </span>
                                )}
                                <span className="bg-gray-100 text-gray-800 px-1 sm:px-2 py-0.5 rounded text-xs sm:text-sm whitespace-nowrap">
                                  {document.type}
                                </span>
                              </div>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 line-clamp-2">
                              {document.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1 text-xs sm:text-sm text-gray-500">
                              <span>{document.size}</span>
                              <span>•</span>
                              <span>
                                {document.pages}{" "}
                                {t("documents.job_listings.pages")}
                              </span>
                              <span>•</span>
                              <span>{formatDate(document.publishDate)}</span>
                              <span>•</span>
                              <span>
                                {formatDownloads(document.downloads)}{" "}
                                {t("documents.job_listings.downloads")}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-1 sm:space-x-2 justify-end">
                          <button
                            onClick={() =>
                              handleDownload(document.id, document.title)
                            }
                            disabled={downloadingDocId === document.id}
                            className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-2 sm:px-3 md:px-6 py-1 sm:py-2 rounded-md sm:rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200 flex items-center disabled:opacity-50 text-xs sm:text-sm whitespace-nowrap"
                          >
                            {downloadingDocId === document.id ? (
                              t("documents.actions.downloading", {
                                progress: downloadProgress,
                              })
                            ) : (
                              <>
                                <ArrowDownTrayIcon className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2" />
                                {isMobile
                                  ? t("documents.actions.download").slice(0, 2)
                                  : t("documents.actions.download")}
                              </>
                            )}
                          </button>
                          <button
                            className="border-2 border-gray-300 text-gray-600 px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-md sm:rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-200 text-xs sm:text-sm"
                            onClick={() =>
                              document.imageUrl &&
                              setViewingImage(document.imageUrl)
                            }
                          >
                            <EyeIcon className="w-3 sm:w-4 h-3 sm:h-4" />
                          </button>
                        </div>
                      </div>
                      {downloadingDocId === document.id && (
                        <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 md:h-2.5 mt-2 sm:mt-3">
                          <div
                            className="bg-blue-600 h-1.5 sm:h-2 md:h-2.5 rounded-full"
                            style={{ width: `${downloadProgress}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="bg-white rounded-md sm:rounded-lg p-4 sm:p-6 md:p-8 text-center">
                <p className="text-xs sm:text-sm md:text-base text-gray-500">
                  {t("documents.all_documents.no_documents")}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-4 sm:mt-8 md:mt-12 lg:mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-md sm:rounded-lg shadow-md sm:shadow-lg p-4 sm:p-6 md:p-8 text-white"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">
            {t("documents.newsletter.title")}
          </h2>
          <p className="text-xs sm:text-sm md:text-base mb-4 sm:mb-6 md:mb-8">
            {t("documents.newsletter.description")}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Documents;
