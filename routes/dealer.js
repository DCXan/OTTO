// Everything related to dealer dashboard

const express = require("express")
const dealerRouter = express.Router()

dealerRouter.get("/dashboard", async (req, res) => {

  // const myCars = await models.

  res.render("dealer-dashboard")
})

dealerRouter.get('/add-car', (req, res) => {
  res.render('add-car')
})

module.exports = dealerRouter
