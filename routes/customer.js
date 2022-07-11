// Everything related to customer dashboard

const express = require("express")
const { sequelize } = require("../models")
const customerRouter = express.Router()

customerRouter.get("/dashboard", async (req, res) => {
  const id = req.session.customerID
  const firstName = req.session.customerFirstName
  const linkOffer = await models.Offer.findAll({
    where: { customerID: id, accepted: false },
  })
  const myRequest = await models.carRequest.findAll({
    where: { customerID: id },
  })

  res.render("customer-dashboard", {
    request: myRequest,
    myOffer: linkOffer,
    firstName,
  })
})
customerRouter.post("/dashboard", async (req, res) => {
  const make = req.body.make
  const model = req.body.model
  const minYear = req.body.minYear
  const maxYear = req.body.maxYear
  const color = req.body.color
  const price = req.body.price
  const mileage = req.body.mileage
  const customerID = req.session.customerID

  // creating customer object

  const newRequest = await models.carRequest.build({
    make: make,
    model: model,
    minYear: minYear,
    maxYear: maxYear,
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
  const deleteOffer = await models.Offer.destroy({
    where: { requestID: deleteID },
  })
  const deleteRequest = await models.carRequest.destroy({
    where: { id: deleteID },
  })
  res.redirect("/customer/dashboard")
})

customerRouter.post("/myOffers", async (req, res) => {
  const offerID = req.body.offerID
  const acceptedRequest = await models.Offer.update(
    {
      accepted: "True",
    },
    {
      where: { id: offerID },
    }
  )
  res.redirect("/customer/success")
})

customerRouter.post("/decline", async (req, res) => {
  const offerID = req.body.offerID
  const declineRequest = await models.Offer.destroy({ where: { id: offerID } })
  res.redirect("/customer/delete")
})

module.exports = customerRouter

customerRouter.get("/success", async (req, res) => {
  const id = req.session.customerID
  const firstName = req.session.customerFirstName
  const myProfile = await models.User.findAll({
    where: { firstName: firstName },
  })
  res.render("success", { profile: myProfile })
})
customerRouter.get("/delete", async (req, res) => {
  const id = req.session.customerID
  const firstName = req.session.customerFirstName
  const myProfile = await models.User.findAll({
    where: { firstName: firstName },
  })
  res.render("delete-request", { profile: myProfile })
})
