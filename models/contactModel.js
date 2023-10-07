const mongoose = require("mongoose");
const user = require('./userModel');
// This schema will have all the values we want im our contact
const contactSchema = mongoose.Schema(
  {
    id:{
      type: mongoose.Schema.Types.ObjectId, 
      required: true, 
      ref: user
    }, 
    name: {
      type: String,
      required: [true, "Please add the contact name"],
    },
    email: {
      type: String,
      required: [true, "Please add the contact email address"],
    },
    phone: {
      type: String,
      required: [true, "Please add your phone number"],
    },
  },
  {
    timestamps: true,
  }
);
  module.exports = mongoose.model("Contact", contactSchema)