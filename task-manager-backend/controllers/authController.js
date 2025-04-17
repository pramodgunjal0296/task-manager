exports.googleAuth = (req, res, next) => {
  next();
};

exports.googleCallback = (req, res) => {
  res.redirect("http://localhost:3000/dashboard");
};

exports.getUser = (req, res) => {
  res.send(req.user);
};

exports.logoutUser = (req, res) => {
  req.logout(() => {
    res.send({ message: "Logged out" });
  });
};
