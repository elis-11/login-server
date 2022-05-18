const express = require("express");
const User = require("../models/Users");

const usersRouter = express.Router();

// GET /users
// get ALL users route
usersRouter.get("/", async (req, res) => {
  const usersAll = await User.find();
  res.json(usersAll);
});

//POST /users
// create / signup new user
usersRouter.post("/", async (req, res) => {

  const {email}=req.body

  console.log(email);

  const userExisting= await User.findOne({email})
  if(userExisting){
  return  res.status(400).json({error: `User with email ${email} already exists `})
  }
  
  const userNew = await User.create(req.body);
  res.json(userNew);
});

// POST /users/login
// login a user
usersRouter.post("/login", async (req, res) => {

const {email, password} = req.body

  console.log(req.body);

  const userFound= await User.findOne({email: email, password})

  if(!userFound)
  return res.status(404).json({error: "User does not exist! Please enter your email / password."})
res.json(userFound)
})


module.exports = usersRouter;
