const express = require("express");
// const dotenv = require("dotenv").config();
const contactRoutes = require("./routes/contactRoutes");
const errorHandler = require('./middleware/errorHandler');
const app = express();

// const port = process.env.PORT || 5000;
const port = 5000;

// To parse the message from client we need to use this middleware
app.use(express.json());

app.use("/api/contacts", contactRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
