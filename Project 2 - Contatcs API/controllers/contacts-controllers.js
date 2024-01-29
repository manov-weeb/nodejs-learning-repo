const asyncHandler = require("express-async-handler");
const Contact = require("../models/conatcts-model");
const conatctsModel = require("../models/conatcts-model");

const getAllContacts = asyncHandler(async (req, res, next) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  return res.json({ success: true, contacts }).status(200);
});

const getContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return res
      .status(404)
      .json({ success: false, message: "Contact not found." });
  }

  return res.json({ success: true, contact });
});

const createContact = asyncHandler(async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are mandatory." });
  }

  const newContact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  console.log("The request body is ", req.body);
  return res
    .json({ success: true, message: `Created a contact ${newContact}` })
    .status(201);
});

const updateContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return res
      .status(404)
      .json({ success: false, message: "Contact not found." });
  }

  if (contact.user_id.toString() !== req.user.id) {
    return res
      .status(403)
      .json({
        success: false,
        message: "You don't have permission to perform this.",
      });
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  return res
    .json({
      message: `Updated the contact for ID: ${req.params.id}`,
      updatedContact,
    })
    .status(200);
});

const deleteContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return res
      .status(404)
      .json({ success: false, message: "Contact not found." });
  }

  if (contact.user_id.toString() !== req.user.id) {
    return res
      .status(403)
      .json({
        success: false,
        message: "You don't have permission to perform this.",
      });
  }

  await Contact.findByIdAndDelete(req.params.id);

  return res
    .status(200)
    .json({ message: `Deleted the contact with ID: ${req.params.id}` });
});

module.exports = {
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
