const path = require("path");
const mongoose = require("mongoose");
const User = require("../models/User");
const handleErrors = require("../helper/errors.helper");
const createToken = require("../helper/create.token");

exports.getHomePage = (req, res) => res.render("home");
exports.getSmoothies = (req, res) => res.render("smoothies");

exports.getLoginPage = (req, res) => res.render("login");
exports.getSignupPage = (req, res) => res.render("signup");

exports.postLoginPage = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

exports.postSignupPage = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    await user.save();
    res.status(201).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

exports.logout = async (req, res) => {
  res.cookie("jwt", "", {
    maxAge: 1,
  });
  res.redirect("/");
};
