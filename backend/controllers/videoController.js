const Video = require("../models/Video");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage }).fields([
  { name: "file", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
]);

const createVideo = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      date,
      author,
      duration,
      featured,
      status,
      url: youtubeUrl,
    } = req.body;
    const userId = req.user.id;
    let url = youtubeUrl;
    let thumbnail = null;

    if (req.files && req.files.file) {
      url = `uploads/${req.files.file[0].filename}`;
    } else if (req.files && req.files.thumbnail) {
      thumbnail = `uploads/${req.files.thumbnail[0].filename}`;
    }

    if (!url) {
      return res
        .status(400)
        .json({ message: "File upload or URL is required" });
    }

    const video = await Video.create({
      title,
      description,
      url,
      thumbnail,
      category,
      date,
      author,
      duration,
      featured,
      status,
      uploadedBy: userId,
    });
    res.status(201).json({
      message: "Video created successfully",
      video,
    });
  } catch (error) {
    res.json({
      message: "Internal server error while creating video",
      error: error.message,
    });
  }
};

const getVideos = async (req, res) => {
  try {
    const videos = await Video.findAll();
    res.status(200).json({
      message: "Videos retrieved successfully",
      videos,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while retrieving videos",
      error: error.message,
    });
  }
};

const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      category,
      date,
      author,
      duration,
      featured,
      status,
    } = req.body;
    const video = await Video.findByPk(id);
    if (!video) {
      return res.status(404).json({ message: "Video not found with this ID" });
    }

    // If a new file is uploaded, delete the old one
    if (req.file) {
      if (video.url) {
        const oldPath = path.join(__dirname, "..", video.url);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      video.url = `uploads/${req.file.filename}`;
    }

    video.title = title || video.title;
    video.description = description || video.description;
    video.category = category || video.category;
    video.date = date || video.date;
    video.author = author || video.author;
    video.duration = duration || video.duration;
    video.featured = featured || video.featured;
    video.status = status || video.status;
    await video.save();
    res.status(200).json({
      message: "Video updated successfully",
      video,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while updating video",
      error: error.message,
    });
  }
};

const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findByPk(id);
    if (!video) {
      return res.status(404).json({ message: "Video not found with this ID" });
    }

    // Delete the file from the server
    if (video.url) {
      const filePath = path.join(__dirname, "..", video.url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await video.destroy();
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while deleting video",
      error: error.message,
    });
  }
};

module.exports = {
  createVideo,
  getVideos,
  updateVideo,
  deleteVideo,
  upload,
};
