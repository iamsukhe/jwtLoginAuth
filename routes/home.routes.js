const express = require("express");
const router = express.Router();
const Home = require("../controllers/home.controller");
const { requireAuth } = require("../middlewares/authMiddleware");

// routes
router.get("/", Home.getHomePage);
router.get("/smoothies", requireAuth, Home.getSmoothies);

router.get("/login", Home.getLoginPage);
router.post("/login", Home.postLoginPage);

router.get("/signup", Home.getSignupPage);
router.post("/signup", Home.postSignupPage);

router.get("/logout", Home.logout);

module.exports = router;
