const { Announcement, User } = require("../models");

const createAnnouncement = async (req, res) => {
  try {
    const {
      title,
      content,
      category,
      priority,
      publishDate,
      expiryDate,
      targetAudience,
      tags,
    } = req.body;
    const userId = req.user.id; // From authMiddleware
    const attachments = null;

    if (!title || !content || !category) {
      return res
        .status(400)
        .json({ message: "Title, content, and category are required" });
    }

    const announcement = await Announcement.create({
      title,
      content,
      category,
      priority: priority || "medium",
      publishDate: publishDate || new Date(),
      expiryDate,
      targetAudience: targetAudience || "all",
      tags,
      attachments,
      postedBy: userId,
    });

    res.status(201).json({
      message: "Announcement created successfully",
      announcement,
    });
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({
      message: "Internal server error while creating announcement",
      error: error.message,
    });
  }
};

const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
      ],
      order: [["publishDate", "DESC"]],
    });
    res.status(200).json({ announcements: announcements });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while retrieving announcements",
      error: error.message,
    });
  }
};

const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      content,
      category,
      priority,
      publishDate,
      expiryDate,
      targetAudience,
      tags,
    } = req.body;
    const announcement = await Announcement.findByPk(id);

    if (!announcement) {
      return res
        .status(404)
        .json({ message: "Announcement not found with this ID" });
    }

    announcement.title = title || announcement.title;
    announcement.content = content || announcement.content;
    announcement.category = category || announcement.category;
    announcement.priority = priority || announcement.priority;
    announcement.publishDate = publishDate || announcement.publishDate;
    announcement.expiryDate = expiryDate || announcement.expiryDate;
    announcement.targetAudience = targetAudience || announcement.targetAudience;
    announcement.tags = tags || announcement.tags;

    await announcement.save();

    res.status(200).json({
      message: "Announcement updated successfully",
      announcement,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while updating announcement",
      error: error.message,
    });
  }
};

const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const announcement = await Announcement.findByPk(id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    await announcement.destroy();
    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while deleting announcement",
      error: error.message,
    });
  }
};

module.exports = {
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
};
