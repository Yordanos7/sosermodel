const Vacancy = require("../models/Vacancy");
const { User } = require("../models");

const createVacancy = async (req, res) => {
  try {
    const {
      title,
      department,
      location,
      employmentType,
      experienceLevel,
      salaryMin,
      salaryMax,
      applicationDeadline,
      jobDescription,
      responsibilities,
      requirements,
      qualifications,
      benefits,
      contactEmail,
      contactPhone,
      hiringManager,
      urgent,
    } = req.body;
    const userId = req.user ? req.user.id : null;
    const image = req.file ? req.file.path : null;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const vacancy = await Vacancy.create({
      title,
      department,
      location,
      employmentType,
      experienceLevel,
      salaryMin: salaryMin || null,
      salaryMax: salaryMax || null,
      applicationDeadline,
      jobDescription,
      responsibilities,
      requirements,
      qualifications,
      benefits,
      contactEmail,
      contactPhone,
      hiringManager,
      urgent: urgent === "true",
      postedBy: userId,
      image,
    });

    res.status(201).json({ message: "Vacancy created successfully", vacancy });
  } catch (error) {
    console.error("Error creating vacancy:", {
      message: error.message,
      stack: error.stack,
      reqBody: req.body,
      reqFile: req.file,
    });
    res
      .status(500)
      .json({ message: "Error creating vacancy", error: error.message });
  }
};

const getVacancies = async (req, res) => {
  try {
    const vacancies = await Vacancy.findAll();
    res.status(200).json(vacancies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching vacancies", error: error.message });
  }
};

const getVacancy = async (req, res) => {
  try {
    const { id } = req.params;
    const vacancy = await Vacancy.findByPk(id);
    if (!vacancy) {
      return res.status(404).json({ message: "Vacancy not found" });
    }
    res.status(200).json(vacancy);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching vacancy", error: error.message });
  }
};

const updateVacancy = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      department,
      location,
      employmentType,
      experienceLevel,
      salaryMin,
      salaryMax,
      applicationDeadline,
      jobDescription,
      responsibilities,
      requirements,
      qualifications,
      benefits,
      contactEmail,
      contactPhone,
      hiringManager,
      urgent,
    } = req.body;
    const image = req.file ? req.file.path : null;

    const vacancy = await Vacancy.findByPk(id);
    if (!vacancy) {
      return res.status(404).json({ message: "Vacancy not found" });
    }

    const updateData = {
      title,
      department,
      location,
      employmentType,
      experienceLevel,
      salaryMin,
      salaryMax,
      applicationDeadline,
      jobDescription,
      responsibilities,
      requirements,
      qualifications,
      benefits,
      contactEmail,
      contactPhone,
      hiringManager,
      urgent: urgent === "true",
    };

    if (image) {
      updateData.image = image;
    }

    await vacancy.update(updateData);

    res.status(200).json({ message: "Vacancy updated successfully", vacancy });
  } catch (error) {
    console.error("Error updating vacancy:", {
      message: error.message,
      stack: error.stack,
      reqBody: req.body,
      reqFile: req.file,
    });
    res
      .status(500)
      .json({ message: "Error updating vacancy", error: error.message });
  }
};

const deleteVacancy = async (req, res) => {
  try {
    const { id } = req.params;
    const vacancy = await Vacancy.findByPk(id);
    if (!vacancy) {
      return res.status(404).json({ message: "Vacancy not found" });
    }
    await vacancy.destroy();
    res.status(200).json({ message: "Vacancy deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting vacancy", error: error.message });
  }
};

module.exports = {
  createVacancy,
  getVacancies,
  getVacancy,
  updateVacancy,
  deleteVacancy,
};
