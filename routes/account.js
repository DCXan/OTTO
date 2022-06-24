// Routes for homepage, login, and registration

const express = require("express");
const accountRouter = express.Router();

const bcrypt = require("bcryptjs");

// Display log in and register pages

accountRouter.get("/login", (req, res) => {
  let isRegistered = req.query.success;
  if (isRegistered) {
    res.render("login", { message: "Account created successfully." });
  } else {
    res.render("login");
  }
});

accountRouter.get("/register", (req, res) => {
  res.render("register");
});

// Allow user to register by submitting a desired username and password

accountRouter.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check database to see if username already exists. If username exists return user to registration page and display error message

  // CHECK ON HOW TO IMPLEMENT WITH FIND OR CREATE
  // const [user, created] = await models.User.findOrCreate({
  //   where: {username: username},
  //   defaults: {password: password}
  // })

  const user = await models.User.findOne({
    where: { username: username },
  });

  if (user != null) {
    res.render("register", {
      message: "Username is taken. Please choose a different one.",
    });
  } else {
    bcrypt.genSalt(10).then((salt) => {
      bcrypt.hash(password, salt).then((hash) => {
        const user = models.User.build({
          username: username,
          password: hash,
        });
        user.save().then((savedUser) => {
          res.render("login", { message: "Account registration successful!" });
        });
      });
    });
  }
});

// Allow user to log in with valid credentials in users DB.

accountRouter.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Search users DB for an existing username/pw combo. If combo doesn't exist, return to login and display message.

  if (username.length == 0 || password.length == 0) {
    return;
  } else {
    const user = await models.User.findOne({
      where: { username: username },
    });

    if (user == null) {
      res.render("login", { message: "Invalid username and/or password." });
    } else {
      bcrypt
        .compare(password, user.password)
        .then((passwordsEqual) => {
          if (passwordsEqual) {
            if (req.session) {
              req.session.userID = user.id;
              req.session.username = user.username;
            }
            res.redirect("/posts");
          } else {
            res.render("login", {
              errorMessage: "Invalid username and/or password.",
            });
          }
        })
        .catch((error) => {
          res.render("login", {
            errorMessage: "Invalid username and/or password.",
          });
        });
    }
  }
});

accountRouter.post("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy();
  }
  res.render("login", { logoutMessage: "You have been logged out." });
});

module.exports = accountRouter;
