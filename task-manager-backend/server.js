require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const passport = require("passport");
const cors = require("cors");
require("./config/passport");

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

app.use(express.json());

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() =>
    app.listen(5000, () =>
      console.log("Server running on http://localhost:5000")
    )
  )
  .catch(err => console.log(err));
