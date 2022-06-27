// Routes for homepage, login, and registration

const express = require("express")
const accountRouter = express.Router()

const bcrypt = require("bcryptjs")

// Display log in and register pages

accountRouter.get("/login", (req, res) => {
  res.render("login")
})

accountRouter.get("/register", (req, res) => {
  res.render("register")
})

// Allow user to register by submitting a desired username and password

accountRouter.post("/register", async (req, res) => {
<<<<<<< HEAD
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const email = req.body.email
  const password = req.body.password
=======

  console.log(req.body)

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const accountType = req.body.accountType;
>>>>>>> 44c6b5b41bb142328193d6fb2a7108098f2c814b

  if (
    email.length == 0 ||
    password.length == 0 ||
    firstName.length == 0 ||
    lastName.length == 0
  ) {
    res.render("register", {
      message: "Please fill out all fields to create an account.",
    })
  } else {
    // Check database to see if username already exists. If username exists return user to registration page and display error message

    // CHECK ON HOW TO IMPLEMENT WITH FIND OR CREATE
    // const [user, created] = await models.User.findOrCreate({
    //   where: {username: username},
    //   defaults: {password: password}
    // })

    const account = await models.User.findOne({
      where: { email: email },
    })

    if (account != null) {
      res.render("register", {
        message: `The email address ${email} is already associated with an account.`,
      })
    } else {
      bcrypt.genSalt(10).then(salt => {
        bcrypt.hash(password, salt).then(hash => {
          const newAccount = models.User.build({
            email: email,
            password: hash,
<<<<<<< HEAD
          })
          newAccount.save().then(savedAccount => {
=======
            firstName: firstName,
            lastName: lastName,
            accountType: accountType
          });
          newAccount.save().then((savedAccount) => {
>>>>>>> 44c6b5b41bb142328193d6fb2a7108098f2c814b
            res.render("login", {
              message: "Account registration successful!",
            })
          })
        })
      })
    }
  }
})

// Allow user to log in with valid credentials in users DB.

accountRouter.post("/login", async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  // Search users DB for an existing username/pw combo. If combo doesn't exist, return to login and display message.

  if (email.length == 0 || password.length == 0) {
    res.render("login", {
      message:
        "Please enter a valid email address AND password in order to log in.",
    })
  } else {
    const user = await models.User.findOne({
      where: { email: email },
    })

    if (user == null) {
      res.render("login", { message: "Invalid email and/or password." })
    } else {
      bcrypt
        .compare(password, user.password)
        .then(passwordsEqual => {
          if (passwordsEqual && user.customer == true) {
            if (req.session) {
              req.session.buyerID = user.id
              req.session.buyerUsername = user.email
              req.session.buyerTrue = user.customer
            }
            res.redirect("/buyer/home")
          } else if (passwordsEqual && user.customer == false) {
            if (req.session) {
              req.session.dealerID = user.id
              req.session.dealerUsername = user.email
              req.session.dealerFalse = user.customer
            }
            res.redirect("/dealer/home")
          } else {
            res.render("login", {
              errorMessage: "Invalid email and/or password.",
            })
          }
        })
        .catch(error => {
          res.render("login", {
            errorMessage: "Invalid email and/or password.",
          })
        })
    }
  }
})

accountRouter.post("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy()
  }
  res.render("login", { logoutMessage: "You have been logged out." })
})

module.exports = accountRouter
