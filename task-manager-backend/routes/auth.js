const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../controllers/authController");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  authController.googleAuth
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  authController.googleCallback
);

router.get("/user", authController.getUser);

router.get("/logout", authController.logoutUser);

module.exports = router;
