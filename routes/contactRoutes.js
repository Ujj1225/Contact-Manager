const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  res.json({ message: "Get all contacts" });
});

router.route("/:id").get((req,res) =>{
    res.json({message: `Get contact for id: ${req.params.id}`})
})

router.route("/").post((req, res) => {
  res.json({ message: "Create contacts" });
});

router.route("/:id").put((req, res) => {
  res.json({ message: `Update contact for id: ${req.params.id}` });
});

router.route("/:id").delete((req, res) => {
  res.json({ message: `Delete contact for id: ${req.params.id}` });
});

module.exports = router;
