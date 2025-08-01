const Document = require("../models/Document");
const fs = require("fs");
const path = require("path");

const createDocument = async (req, res) => {
  try {
    const {
      title,
      type,
      description,
      size,
      pages,
      publishDate,
      downloads,
      category,
      featured,
    } = req.body;
    const filePath = req.file ? req.file.path : null;

    if (!filePath) {
      return res.status(400).json({ message: "File is required" });
    }

    const document = await Document.create({
      title,
      type,
      description,
      size,
      pages,
      publishDate,
      downloads,
      category,
      featured,
      filePath,
      uploadedBy: req.user.id,
    });

    res.status(201).json({
      message: "Document created successfully",
      document,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while creating document",
      error: error.message,
    });
  }
};

const getDocuments = async (req, res) => {
  try {
    const documents = await Document.findAll();
    res.status(200).json({
      message: "Documents retrieved successfully",
      documents,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while retrieving documents",
      error: error.message,
    });
  }
};

const updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      type,
      description,
      size,
      pages,
      publishDate,
      downloads,
      category,
      featured,
    } = req.body;
    const document = await Document.findByPk(id);

    if (!document) {
      return res
        .status(404)
        .json({ message: "Document not found with this ID" });
    }

    if (req.file) {
      if (document.filePath) {
        // Delete old file
        const oldFilePath = path.join(__dirname, "..", document.filePath);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
      document.filePath = req.file.path;
    }

    document.title = title || document.title;
    document.type = type || document.type;
    document.description = description || document.description;
    document.size = size || document.size;
    document.pages = pages || document.pages;
    document.publishDate = publishDate || document.publishDate;
    document.downloads = downloads || document.downloads;
    document.category = category || document.category;
    document.featured = featured || document.featured;

    await document.save();
    res.status(200).json({
      message: "Document updated successfully",
      document,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while updating document",
      error: error.message,
    });
  }
};

const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const document = await Document.findByPk(id);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    if (document.filePath) {
      const filePath = path.join(__dirname, "..", document.filePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await document.destroy();
    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while deleting document",
      error: error.message,
    });
  }
};

const downloadDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const document = await Document.findByPk(id);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    const filePath = path.join(__dirname, "..", document.filePath);
    if (fs.existsSync(filePath)) {
      document.downloads += 1;
      await document.save();

      res.download(filePath, path.basename(filePath), (err) => {
        if (err) {
          // The headers are already sent, so we can't send a JSON response.
          // The error will be logged on the server.
          console.error("Error downloading file:", err);
        }
      });
    } else {
      res.status(404).json({ message: "File not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while downloading document",
      error: error.message,
    });
  }
};

module.exports = {
  createDocument,
  getDocuments,
  updateDocument,
  deleteDocument,
  downloadDocument,
};
