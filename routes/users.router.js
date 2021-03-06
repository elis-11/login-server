const express = require("express");
const User = require("../models/Users");

const usersRouter = express.Router();

// GET /users
// get ALL users route
usersRouter.get("/", async (req, res) => {
  const usersAll = await User.find();
  res.json(usersAll);
});

// GET /users/me
// just one purpose => check if I am still logged in
usersRouter.get("/me", (req, res) =>{
  if(!req.session.user){
    return res.status(401).json({
      error: "You are not logged in"
    })
  }
  // on success: send the stored user info!
  res.json(req.session.user);
})

// POST /users
// create / signup new user
usersRouter.post("/", async (req, res) => {
  const { email } = req.body;

  console.log("Signup request: ", req.body);

  // forward data parsed by TÜRSTEHER (express.json middleware)
  // to database!

  const userExisting = await User.findOne({ email });

  // ERROR HANDLING
  // if user already exists => prevent creation!
  if (userExisting) {
    return res
      .status(400)
      .json({ error: `User with email ${email} already exists` });
  }

  // user does not exist => create
  const userNew = await User.create(req.body);
  res.json(userNew);
});

// POST /users/login
// login a user
usersRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  // check if user with given email and password EXISTS in database
  const userFound = await User.findOne({
    email: email,
    password,
  });

  // user with given email and password from req.body was not found!
  // Login fail!
  if (!userFound)
    return res.status(400).json({
      error: "User does not exist! Try with other email / password. Typo?",
    });

  req.session.user = userFound;

  // user exists! respond with found user
  res.json(userFound);
});

usersRouter.get("/logout", (req, res) => {
  // console.log(req.session.user);

  req.session.destroy((err) => {

    res.clearCookie("connect.sid")
    res.json({
      message: "Logged you out successfully!",
     });
  });
});

module.exports = usersRouter;
