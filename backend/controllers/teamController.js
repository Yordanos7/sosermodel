const { Team } = require("../models");

// Create a new team member
exports.createTeamMember = async (req, res) => {
  try {
    const { name, position, category } = req.body;
    const photo = req.file ? req.file.path : null;

    if (!photo) {
      return res.status(400).json({ error: "Photo is required" });
    }

    const newMember = await Team.create({
      name,
      position,
      category,
      photo,
    });

    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all team members
exports.getAllTeamMembers = async (req, res) => {
  try {
    const members = await Team.findAll();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a team member
exports.deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Team.findByPk(id);

    if (!member) {
      return res.status(404).json({ error: "Team member not found" });
    }

    await member.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
