const News = require("../models/News");

const createNews = async (req, res) => {
  try {
    const { title, body, category } = req.body;
    const userId = req.userId.id;
    const news = await News.create({
      title,
      body,
      category,
      postedBy: userId,
    });

    res.status(201).json({
      message: "News created successfully",
      news,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while creating news",
      error: error.message,
    });
  }
};

const getNews = async (req, res) => {
  try {
    const news = await News.findAll();
    res.status(200).json({
      message: "News retrieved successfully",
      news,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while retrieving news",
      error: error.message,
    });
  }
};

const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body, category } = req.body;
    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({ message: "News not found with this ID" });
    }
    news.title = title || news.title;
    news.body = body || news.body;
    news.category = category || news.category;
    await news.save();
    res.status(200).json({
      message: "News updated successfully",
      news,
    });
  } catch (error) {
    res.stus(500).json({
      message: "Internal server error while updating news",
      error: error.message,
    });
  }
};

const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    await news.destroy();
    res.status(200).json({ message: "News deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while deleting news",
      error: error.message,
    });
  }
};

const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    res.status(200).json({
      message: "News retrieved successfully",
      news,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while retrieving news",
      error: error.message,
    });
  }
};

module.exports = {
  createNews,
  getNews,
  updateNews,
  deleteNews,
  getNewsById,
};
