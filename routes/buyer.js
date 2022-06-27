// Everything related to buyer dashboard

const express = require("express")
const buyerRouter = express.Router()

buyerRouter.get("/home", (req, res) => {
  res.render("buyer")
})

buyerRouter.post("/home", (req, res) => {})

module.exports = buyerRouter

buyerRouter.get("/request", (req, res) => {
  res.render("request")
})
