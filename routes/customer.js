// Everything related to customer dashboard

const express = require("express")
const { sequelize } = require("../models")
const customerRouter = express.Router()
customerRouter.get("/dashboard", (req, res) => {
  res.render("customer-dashboard")
})
customerRouter.post("/dashboard", (req, res) => {})
customerRouter.get("/request", (req, res) => {
  res.render("request")
})
// creating customer object

customerRouter.post("/request", async (req, res) => {
  const make = req.body.make
  const model = req.body.model
  const year = req.body.year
  const color = req.body.color
  const price = req.body.price
  const mileage = req.body.mileage
  const id = req.session.customerID

  const newRequest = await models.carRequest.build({
    make: make,
    model: model,
    year: year,
    color: color,
    maxPrice: price,
    maxMileage: mileage,
    customerID: id,
  })
  newRequest.save().then(savedRequest => {
    res.render("request")
  })
})

module.exports = customerRouter
