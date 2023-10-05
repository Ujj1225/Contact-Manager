// @desciption for all contacts
// @route {method:GPPD}/api/contacts
// @access public

const getContact = (req, res) => {
  res.status(200).json({ message: "Get all contacts" });
};

const getContactID = (req, res) => {
  res.json({ message: `Get contact for id: ${req.params.id}` });
};

const postContact = (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    // Syntax for error
    throw new Error("All fields are mandatory");
  }
  res.json({ message: "Create contacts" });
};

const putContact = (req, res) => {
  res.json({ message: `Update contact for id: ${req.params.id}` });
};

const deleteContact = (req, res) => {
  res.json({ message: `Delete contact for id: ${req.params.id}` });
};

module.exports = {
  getContact,
  postContact,
  getContactID,
  putContact,
  deleteContact,
};
