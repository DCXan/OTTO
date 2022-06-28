// Everything related to dealer dashboard

const express = require("express")
const dealerRouter = express.Router()

dealerRouter.get("/dashboard", (req, res) => {
  res.render("dealer-dashboard")
})

module.exports = dealerRouter
