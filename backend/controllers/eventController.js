const { Event, User } = require("../models");

const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      eventType,
      date,
      startTime,
      endTime,
      location,
      capacity,
      registrationRequired,
      registrationDeadline,
      cost,
      organizer,
      contactEmail,
      contactPhone,
      tags,
      requirements,
      featured,
    } = req.body;
    const image = req.file ? req.file.path : null;

    const event = await Event.create({
      title,
      featured,
      description,
      eventType,
      date,
      startTime,
      endTime,
      location,
      capacity,
      registrationRequired,
      registrationDeadline,
      cost,
      organizer,
      contactEmail,
      contactPhone,
      tags,
      requirements,
      createdBy: req.user.id,
      image,
    });

    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while creating event",
      error: error.message,
    });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
      ],
      order: [["date", "DESC"]],
    });

    res.status(200).json({ events: events });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error while retrieving events",
      error: error.message,
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      eventType,
      date,
      startTime,
      endTime,
      location,
      capacity,
      registrationRequired,
      registrationDeadline,
      cost,
      organizer,
      contactEmail,
      contactPhone,
      tags,
      requirements,
      featured,
    } = req.body;

    const event = await Event.findByPk(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found with this ID" });
    }

    event.title = title || event.title;
    event.description = description || event.description;
    event.featured = featured;
    event.eventType = eventType || event.eventType;
    event.date = date || event.date;
    event.startTime = startTime || event.startTime;
    event.endTime = endTime || event.endTime;
    event.location = location || event.location;
    event.capacity = capacity || event.capacity;
    event.registrationRequired =
      registrationRequired || event.registrationRequired;
    event.registrationDeadline =
      registrationDeadline || event.registrationDeadline;
    event.cost = cost || event.cost;
    event.organizer = organizer || event.organizer;
    event.contactEmail = contactEmail || event.contactEmail;
    event.contactPhone = contactPhone || event.contactPhone;
    event.tags = tags || event.tags;
    event.requirements = requirements || event.requirements;
    if (req.file) {
      event.image = req.file.path;
    }

    await event.save();

    res.status(200).json({
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while updating event",
      error: error.message,
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found with this ID" });
    }
    await event.destroy();
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while deleting event",
      error: error.message,
    });
  }
};

module.exports = {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
};
