const express = require("express");
const {
  getAllContacts,
  createContact,
  updateContact,
  deleteContact,
  getContact,
} = require("../controllers/contacts-controllers");
const validateToken = require("../middleware/validateTokenHandler");

const contactRouter = express.Router();

contactRouter.use(validateToken);

contactRouter.get("/", getAllContacts);
contactRouter.get("/:id", getContact);
contactRouter.post("/create", createContact);
contactRouter.put("/update/:id", updateContact);
contactRouter.delete("/delete/:id", deleteContact);

module.exports = contactRouter;
