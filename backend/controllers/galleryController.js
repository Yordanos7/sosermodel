const Gallery = require("../models/Gallery");
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
const upload = multer({ storage });

const createGalleryItem = async (req, res) => {
  try {
    const { title, description, category, date, featured, status } = req.body;
    const userId = req.user.id;
    const url = req.file ? `uploads/${req.file.filename}` : null;
    if (!url) {
      return res.status(400).json({ message: "File upload failed" });
    }

    const galleryItem = await Gallery.create({
      title,
      description,
      url,
      category,
      date,
      featured,
      status,
      uploadedBy: userId,
    });
    res.status(201).json({
      message: "Gallery item created successfully",
      galleryItem,
    });
  } catch (error) {
    res.json({
      message: "Internal server error while creating gallery item",
      error: error.message,
    });
  }
};

const getGalleryItems = async (req, res) => {
  try {
    const galleryItems = await Gallery.findAll();
    res.status(200).json({
      message: "Gallery items retrieved successfully",
      galleryItems,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while retrieving gallery items",
      error: error.message,
    });
  }
};

const updateGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, date, featured, status } = req.body;
    const galleryItem = await Gallery.findByPk(id);
    if (!galleryItem) {
      return res
        .status(404)
        .json({ message: "Gallery item not found with this ID" });
    }

    // If a new file is uploaded, delete the old one
    if (req.file) {
      if (galleryItem.url) {
        const oldPath = path.join(__dirname, "..", galleryItem.url);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      galleryItem.url = `uploads/${req.file.filename}`;
    }

    galleryItem.title = title || galleryItem.title;
    galleryItem.description = description || galleryItem.description;
    galleryItem.category = category || galleryItem.category;
    galleryItem.date = date || galleryItem.date;
    galleryItem.featured = featured || galleryItem.featured;
    galleryItem.status = status || galleryItem.status;
    await galleryItem.save();
    res.status(200).json({
      message: "Gallery item updated successfully",
      galleryItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while updating gallery item",
      error: error.message,
    });
  }
};

const deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const galleryItem = await Gallery.findByPk(id);
    if (!galleryItem) {
      return res
        .status(404)
        .json({ message: "Gallery item not found with this ID" });
    }

    // Delete the file from the server
    if (galleryItem.url) {
      const filePath = path.join(__dirname, "..", galleryItem.url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await galleryItem.destroy();
    res.status(200).json({ message: "Gallery item deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while deleting gallery item",
      error: error.message,
    });
  }
};

module.exports = {
  createGalleryItem,
  getGalleryItems,
  updateGalleryItem,
  deleteGalleryItem,
  upload,
};
