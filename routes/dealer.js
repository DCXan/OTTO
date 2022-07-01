// Everything related to dealer dashboard

const express = require("express")
const dealerRouter = express.Router()

/////////////////////// DASHBOARD ////////////////////////

dealerRouter.get("/dashboard", async (req, res) => {

  const id = req.session.dealerID
  const user = req.session.firstName

  const myCars = await models.Inventory.findAll({
    where: {dealerID: id}
  })

  const carRequests = await models.carRequest.findAll({
    where: {fulfilled: false},
    order: [["createdAt", "DESC"]]
  })

  const filteredCarRequests = []
  
  carRequests.map(requestedCar => {
     myCars.filter(inventoryCar => {
      if (inventoryCar.make == requestedCar.make && inventoryCar.model == requestedCar.model){
        if (!filteredCarRequests.includes(requestedCar)) {
          filteredCarRequests.push(requestedCar)
        }
      }
    })
  })

  const pendingOffers = await models.Offer.findAll({
    where: {accepted: false},
    order: [["createdAt", "DESC"]]
  })

  const acceptedOffers = await models.Offer.findAll({
    where: {accepted: true},
    order: [["createdAt", "DESC"]]
  })

  res.render("dealer-dashboard", {cars: myCars, requests: filteredCarRequests, pendingOffers: pendingOffers, acceptedOffers: acceptedOffers, user})

})

/////////////////////// INVENTORY ////////////////////////

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


/////////////////////// OFFERS ////////////////////////

dealerRouter.post('/delete-offer', async (req, res) => {

  const id = req.body.offerID

  const deletedOffer = await models.Offer.destroy({
    where: {id: id}
  })

  res.redirect('/dealer/dashboard')

})
// Display Offer Page //

dealerRouter.get('/create-offer/:customerID/:requestID', async (req, res) => {
  
  const dealerID = req.session.dealerID
  const customerID = req.params.customerID
  const requestID = req.params.requestID

  const request = await models.carRequest.findByPk(requestID)
  const customer = await models.User.findOne({
    where: {id: customerID}
  })

  const inventory = await models.Inventory.findAll({
    where: {dealerID: dealerID}
  })

  const filteredCars = []
  
     inventory.filter(inventoryCar => {
      if (inventoryCar.make == request.make && inventoryCar.model == request.model){
        filteredCars.push(inventoryCar)
      }
    })
  

  res.render('offer', {inventory: filteredCars, request, customer})
})

// Send the Offer to database //

dealerRouter.post('/send-offer/:customerID/:requestID', (req, res) => {
  
  console.log(req.body)

  const dealerID = req.session.dealerID
  const customerID = req.params.customerID
  const requestID = req.params.requestID
  const make = req.body.make
  const model = req.body.model
  const year = req.body.year
  const color = req.body.color
  const mileage = req.body.mileage
  const price = req.body.price

  const newOffer = models.Offer.build({
    make: make,
    model: model,
    year: year,
    color: color,
    mileage: mileage,
    offerPrice: price,
    dealerID: dealerID,
    customerID: customerID,
    requestID: requestID
  })
  newOffer.save().then((savedOffer) =>{
    res.redirect('/dealer/dashboard')
  })
})

module.exports = dealerRouter
