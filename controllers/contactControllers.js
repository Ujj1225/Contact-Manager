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

const Contact = require("../models /contactModel");

const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});


const getContactID = asyncHandler(async (req, res) => {
  const contacts = await Contact.findById(req.params.id);
  if (!contacts) {
    res.status(404);
    throw new Error("Contact not found!");
  }
  res.status(200).json(contacts); });


const postContact = asyncHandler(async (req, res) => {
  console.log(req.body);
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
  });
  res.json(contact);
});

const putContact = asyncHandler(async (req, res) => {
  res.json({ message: `Update contact for id: ${req.params.id}` });
});

const deleteContact = asyncHandler(async (req, res) => {
  res.json({ message: `Delete contact for id: ${req.params.id}` });
});

module.exports = {
  getContact,
  postContact,
  getContactID,
  putContact,
  deleteContact,
};
