// i donot think this is needed as i save the contact form data in the frontend

const Service = require("../models/Service");

const createService = async (req, res) => {
  try {
    const { title, description } = req.body;

    const service = await Service.create({
      title,
      description,
    });

    res.status(201).json({ message: "Service created successfully", service });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating service", error: error.message });
  }
};

const getServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.status(200).json(services);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching services", error: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    service.title = title || service.title;
    service.description = description || service.description;
    await service.save();

    res.status(200).json({ message: "Service updated successfully", service });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating service", error: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    await service.destroy();
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting service", error: error.message });
  }
};

module.exports = { createService, getServices, updateService, deleteService };
