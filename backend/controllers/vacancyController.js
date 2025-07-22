const Vacancy = require("../models/Vacancy");

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
    const userId = req.user.id;

    const vacancy = await Vacancy.create({
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
      postedBy: userId,
    });

    res.status(201).json({ message: "Vacancy created successfully", vacancy });
  } catch (error) {
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

const updateVacancy = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const vacancy = await Vacancy.findByPk(id);
    if (!vacancy) {
      return res.status(404).json({ message: "Vacancy not found" });
    }

    vacancy.title = title || vacancy.title;
    vacancy.description = description || vacancy.description;
    await vacancy.save();

    res.status(200).json({ message: "Vacancy updated successfully", vacancy });
  } catch (error) {
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

module.exports = { createVacancy, getVacancies, updateVacancy, deleteVacancy };
