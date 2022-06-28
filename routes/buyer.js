// Everything related to buyer dashboard

const express = require("express")
const { sequelize } = require("../models")
const buyerRouter = express.Router()

buyerRouter.get("/home", (req, res) => {
  res.render("buyer")
})

buyerRouter.post("/home", (req, res) => {})

buyerRouter.get("/request", (req, res) => {
  res.render("request")
})

buyerRouter.post("/request", (req, res) => {
  const make = req.body.make
  const model = req.body.model
  const year = req.body.year
  const color = req.body.color
  const price = req.body.price
  const mileage = req.body.mileage

  const newRequest = models.carRequests.build({
    make: make,
    model: model,
    year: year,
    color: color,
    maxPrice: price,
    maxMileage: mileage,
  })
  newRequest.save().then(savedRequest => {
    res.render("buyer")
  })
})
