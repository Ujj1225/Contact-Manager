const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
// @desc Register a user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  // Now setting up the functionality to register a user
  // Destructuring name, email and password from request body
  // console.log('register user working');
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  // The statement which follows this comment is used to find if the email is already used
  const userAvailable = await user.findOne({ email });
  // There is a issue between line 16 and 17
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  // We cannot store a raw password into our database so need to hash our password
  // In order to hash our password we are going to  make use of a library called bcrypt
  // First create a hash password
  // bcrypt provides us with a promise so we are gonna use async await
  const hashedPassword = await bcrypt.hash(password, 10);
  // 10 is the number of solved rounds
  console.log("Hashed Password: ", hashedPassword);
  const newUser = await user.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log(`User created ${newUser}`);
  // Now for response i dont want to send full user but everything other than password
  if (newUser) {
    res.status(201).json({ _id: newUser.id, email: newUser.email });
    // 201 means resource is successfully created
  } else {
    res.status(400);
    throw new Error("User data not valid!");
  }
  res.json({ message: "Register the user" });
});

// @desc login a user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const checkUser = await user.findOne({ email });
  // compare password with hashed password


  // Here is the problem user.password is not being accessed.
  if (checkUser && (await bcrypt.compare(password, checkUser.password))) {
    // Creating accessToken for logged in users
    // The jwt signin takes a lot of parameters like user info, access token secret, expiration time of token
    console.log('ok');
    const accessToken = jwt.sign(
      {
        user: {
          username: checkUser.username,
          email: checkUser.email,
          id: checkUser.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

// @desc  Current user
// @route GET /api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});
module.exports = { registerUser, loginUser, currentUser };
