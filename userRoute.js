import express from "express";
import User from "../models/userModels";
import { getToken } from "../util";
//import getToken from "../util";

const router = express.Router();

router.post("/signin", async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (signinUser) {
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser),
    });
  } else {
    res.status(401).send({ msg: "invalid Email or Password" });
  }
});

router.post("/register", async (req, res) => {
  const user = new User({
    name: req.body.email,
    email: req.body.email,
    password: req.body.password,
  });
  const newUser = await user.save();
  if (newUser) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser),
    });
  } else {
    res.status(401).send({ msg: "invalid user data" });
  }
});

router.get("/createadmin1", async (req, res) => {
  try {
    const user = new User({
      name: "Ebuka",
      email: "ebukan.ebukanwachukwu885@gmail.com",
      password: "1234",
      isAdmin: true,
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

export default router;
