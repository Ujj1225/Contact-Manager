const express = require("express");
const router = express.Router();
const {
  getContact,
  postContact,
  getContactID,
  putContact,
  deleteContact,
} = require("../controllers/contactControllers");
const validateToken = require("../middleware/validateTokenHandler");


router.use(validateToken);

router.route("/").get(getContact).post(postContact);

router.route("/:id").get(getContactID).put(putContact).delete(deleteContact);

module.exports = router;
