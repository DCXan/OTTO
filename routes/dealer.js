// Everything related to dealer dashboard

const express = require("express")
const dealerRouter = express.Router()

dealerRouter.get("/home", (req, res) => {
  res.render("buyer")
})

module.exports = dealerRouter
