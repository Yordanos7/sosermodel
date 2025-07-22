import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  EyeIcon,
  TrashIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import { getVideos, createVideo, deleteVideo } from "../../api/video";

const ManageVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [uploadMethod, setUploadMethod] = useState("file");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [views, setViews] = useState("");
  const [author, setAuthor] = useState("");
  const [featured, setFeatured] = useState(false);

  const fetchVideos = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getVideos();
      setVideos(data.videos);
    } catch (err) {
      setError(err.message || "Error fetching videos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uploadMethod === "file" && !file) {
      setError("File is required for file upload method.");
      return;
    }
    if (uploadMethod === "url" && !youtubeUrl) {
      setError("YouTube URL is required for URL upload method.");
      return;
    }
    if (!title) {
      setError("Title is required.");
      return;
    }

    const formData = new FormData();
    if (uploadMethod === "file") {
      formData.append("file", file);
    } else {
      formData.append("url", youtubeUrl);
      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }
    }
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("date", date);
    formData.append("duration", duration);
    formData.append("views", views);
    formData.append("author", author);
    formData.append("featured", featured);
    try {
      await createVideo(formData);
      setTitle("");
      setDescription("");
      setFile(null);
      setYoutubeUrl("");
      setThumbnail(null);
      setCategory("");
      setDate("");
      setDuration("");
      setViews("");
      setAuthor("");
      setFeatured(false);
      fetchVideos(); // Refresh the list
    } catch (err) {
      setError(err.message || "Error uploading video.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      try {
        await deleteVideo(id);
        fetchVideos(); // Refresh the list
      } catch (err) {
        setError(err.message || "Error deleting video.");
      }
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Videos</h1>

      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Upload New Video</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-gray-700"
            >
              Duration
            </label>
            <input
              type="text"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="views"
              className="block text-sm font-medium text-gray-700"
            >
              Views
            </label>
            <input
              type="text"
              id="views"
              value={views}
              onChange={(e) => setViews(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700"
            >
              Author
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="featured"
              className="block text-sm font-medium text-gray-700"
            >
              Featured
            </label>
            <input
              type="checkbox"
              id="featured"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="mt-1 block"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Upload Method
            </label>
            <div className="mt-2 flex gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="file"
                  checked={uploadMethod === "file"}
                  onChange={() => setUploadMethod("file")}
                  className="form-radio"
                />
                <span className="ml-2">Upload File</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="url"
                  checked={uploadMethod === "url"}
                  onChange={() => setUploadMethod("url")}
                  className="form-radio"
                />
                <span className="ml-2">YouTube URL</span>
              </label>
            </div>
          </div>

          {uploadMethod === "file" ? (
            <div className="mb-4">
              <label
                htmlFor="file"
                className="block text-sm font-medium text-gray-700"
              >
                Video File
              </label>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                accept="video/*"
              />
            </div>
          ) : (
            <>
              <div className="mb-4">
                <label
                  htmlFor="youtubeUrl"
                  className="block text-sm font-medium text-gray-700"
                >
                  YouTube URL
                </label>
                <input
                  type="text"
                  id="youtubeUrl"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium text-gray-700"
                >
                  Thumbnail Image (Optional)
                </label>
                <input
                  type="file"
                  id="thumbnail"
                  onChange={handleThumbnailChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  accept="image/*"
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ArrowUpTrayIcon className="w-5 h-5 mr-2" />
            Upload Video
          </button>
        </form>
      </div>

      {loading && <div>Loading videos...</div>}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.length === 0 && (
            <div className="col-span-full text-gray-500">No videos found.</div>
          )}
          {videos.map((item) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              whileHover={{ scale: 1.03 }}
            >
              <video
                src={`http://localhost:5000/${item.url}`}
                alt={item.title}
                className="w-full h-48 object-cover"
                controls
              />
              <div className="p-4">
                <h2 className="font-semibold text-lg truncate">{item.title}</h2>
                <p className="text-gray-700 text-sm mb-2 truncate">
                  {item.description}
                </p>
                <div className="mt-4 flex gap-2">
                  <a
                    href={`http://localhost:5000/${item.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  >
                    <EyeIcon className="w-4 h-4 mr-1" />
                    View
                  </a>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="inline-flex items-center px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                  >
                    <TrashIcon className="w-4 h-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageVideos;
