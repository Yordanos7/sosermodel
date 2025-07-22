// this component is not fully needed as the contact form is handled by the frontend
// no need for get FAQs, create FAQs, update FAQs, and delete FAQs lol it's all handled by the frontend
const Contact = require("../models/Contact");

const createContact = async (req, res) => {
  try {
    const { type, question, answer, location } = req.body;

    const contact = await Contact.create({
      type,
      question,
      answer,
      location,
    });

    res
      .status(201)
      .json({ message: "Contact entry created successfully", contact });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating contact entry", error: error.message });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.status(200).json(contacts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching contacts", error: error.message });
  }
};

const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, question, answer, location } = req.body;

    const contact = await Contact.findByPk(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    contact.type = type || contact.type;
    contact.question = question || contact.question;
    contact.answer = answer || contact.answer;
    contact.location = location || contact.location;
    await contact.save();

    res.status(200).json({ message: "Contact updated successfully", contact });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating contact", error: error.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    await contact.destroy();
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting contact", error: error.message });
  }
};

module.exports = { createContact, getContacts, updateContact, deleteContact };
