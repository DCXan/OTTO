// Everything related to customer dashboard

const express = require("express")
const { sequelize } = require("../models")
const customerRouter = express.Router()
customerRouter.get("/dashboard", async (req, res) => {
  const id = req.session.customerID
  const myRequest = await models.carRequest.findAll({
    where: { customerID: id },
  })
  res.render("customer-dashboard", { request: myRequest })
})
customerRouter.post("/dashboard", async (req, res) => {
  const make = req.body.make
  const model = req.body.model
  const year = req.body.year
  const color = req.body.color
  const price = req.body.price
  const mileage = req.body.mileage
  const customerID = req.session.customerID
  // creating customer object

  const newRequest = await models.carRequest.build({
    make: make,
    model: model,
    year: year,
    color: color,
    maxPrice: price,
    maxMileage: mileage,
    customerID: customerID,
  })
  newRequest.save().then(savedRequest => {
    res.redirect("/customer/dashboard")
  })
})
customerRouter.post("/delete-request", async (req, res) => {
  const deleteID = req.body.deleteID

  const deleteRequest = await models.carRequest.destroy({
    where: { id: deleteID },
  })
  res.redirect("/customer/dashboard")
})
module.exports = customerRouter
