// Everything related to dealer dashboard

const express = require("express")
const dealerRouter = express.Router()

dealerRouter.get("/dashboard", async (req, res) => {

  const id = req.session.dealerID
  const user = req.session.firstName

  const myCars = await models.Inventory.findAll({
    where: {dealerID: id}
  })

  const carRequests = await models.carRequest.findAll({
    order: [["createdAt", "DESC"]]
  })

  res.render("dealer-dashboard", {cars: myCars, requests: carRequests, user})
})

dealerRouter.post('/add-car', (req, res) => {
  
  console.log(req.body)

  const dealerID = req.session.dealerID
  const make = req.body.make
  const model = req.body.model
  const year = req.body.year
  const color = req.body.color
  const mileage = req.body.mileage

  const newCar = models.Inventory.build({
    make: make,
    model: model,
    year: year,
    color: color,
    mileage: mileage,
    dealerID: dealerID
  })
  newCar.save().then((savedCar) =>{
    res.redirect('/dealer/dashboard')
  })
})

dealerRouter.post('/delete-car', async (req, res) => {

  const id = req.body.listingID

  const deletedCar = await models.Inventory.destroy({
    where: {id: id}
  })

  res.redirect('/dealer/dashboard')

})

module.exports = dealerRouter
