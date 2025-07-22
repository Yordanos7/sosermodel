const Testimonial = require("../models/Testimonial");
const fs = require("fs");
const path = require("path");

const createTestimonial = async (req, res) => {
  try {
    const {
      name,
      location,
      category,
      loanAmount,
      businessType,
      story,
      impact,
      rating,
      featured,
      year,
    } = req.body;
    const image = req.file ? req.file.path : null;

    const testimonial = await Testimonial.create({
      name,
      location,
      category,
      loanAmount,
      businessType,
      story,
      impact,
      image,
      rating,
      featured,
      year,
    });

    res.status(201).json({
      message: "Testimonial created successfully",
      testimonial,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while creating testimonial",
      error: error.message,
    });
  }
};

const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll();
    res.status(200).json({
      message: "Testimonials retrieved successfully",
      testimonials,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while retrieving testimonials",
      error: error.message,
    });
  }
};

const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      location,
      category,
      loanAmount,
      businessType,
      story,
      impact,
      rating,
      featured,
      year,
    } = req.body;
    const testimonial = await Testimonial.findByPk(id);

    if (!testimonial) {
      return res
        .status(404)
        .json({ message: "Testimonial not found with this ID" });
    }

    if (req.file) {
      if (testimonial.image) {
        // Delete old image
        const oldImagePath = path.join(__dirname, "..", testimonial.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      testimonial.image = req.file.path;
    }

    testimonial.name = name || testimonial.name;
    testimonial.location = location || testimonial.location;
    testimonial.category = category || testimonial.category;
    testimonial.loanAmount = loanAmount || testimonial.loanAmount;
    testimonial.businessType = businessType || testimonial.businessType;
    testimonial.story = story || testimonial.story;
    testimonial.impact = impact || testimonial.impact;
    testimonial.rating = rating || testimonial.rating;
    testimonial.featured = featured || testimonial.featured;
    testimonial.year = year || testimonial.year;

    await testimonial.save();
    res.status(200).json({
      message: "Testimonial updated successfully",
      testimonial,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while updating testimonial",
      error: error.message,
    });
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByPk(id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    if (testimonial.image) {
      const imagePath = path.join(__dirname, "..", testimonial.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await testimonial.destroy();
    res.status(200).json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while deleting testimonial",
      error: error.message,
    });
  }
};

module.exports = {
  createTestimonial,
  getTestimonials,
  updateTestimonial,
  deleteTestimonial,
};
