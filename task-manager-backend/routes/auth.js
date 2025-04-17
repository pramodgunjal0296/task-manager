const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:3000/dashboard"); // frontend URL
  }
);

router.get("/user", (req, res) => {
  res.send(req.user);
});

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.send({ message: "Logged out" });
  });
});

module.exports = router;
