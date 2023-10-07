// @desciption for all contacts
// @route {method:GPPD}/api/contacts
// @access public
// Whenever we interact with mongodb or mongose we get a promise
// so in order to resolve that promise we make use of async await in functions.
// When we use async we need to use try catch block to locate error
// But a better way to do this is using a middleware which is an express async handler
// It will handle our exceptions inside the async express routes
// This middleware will pass the error to errorHandler which we have created
const asyncHandler = require("express-async-handler");
// We wrap all the functions in asynchandler

const Contact = require("../models/contactModel");

const getContact = asyncHandler(async (req, res) => {
  // First we need to fetch all contacts of a logged in user so there it is: user_id: req.user.id
  const contacts = await Contact.find({ id: req.user.id });
  res.status(200).json(contacts);
});

const getContactID = asyncHandler(async (req, res) => {
  const contacts = await Contact.findById(req.params.id);
  if (!contacts) {
    res.status(404);
    throw new Error("Contact not found!");
  }
  res.status(200).json(contacts);
});

const postContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    // Syntax for error
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    id: req.user.id,
  });
  res.json(contact);
});

const putContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.findById(req.params.id);
  if (!contacts) {
    res.status(404);
    throw new Error("Contact not found!");
  }
// To check if a diff user is trying to update the contact  
if(contacts.id.toString() !== req.user.id)
{
    res.status(403);
    throw new Error("User dont have permission to update other users contact");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedContact);
});

const deleteContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.findById(req.params.id);
  if (!contacts) {
    res.status(404);
    throw new Error("Contact not found!");
  }
   if (contacts.id.toString() !== req.user.id) {
     res.status(403);
     throw new Error("User dont have permission to delete other users contact");
   }
  const deletedContact = await Contact.deleteOne({ _id: req.params.id });
  res.json({ deletedContact });
});

module.exports = {
  getContact,
  postContact,
  getContactID,
  putContact,
  deleteContact,
};
