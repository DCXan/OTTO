const express = require("express")
const app = express()

global.models = require("./models")
const authenticationMW = require("./middleware/authenticate")

app.use(express.urlencoded({ extended: true }))

// Initialize sessions
const session = require("express-session")

app.use(
  session({
    secret: "random123",
    resave: false,
    saveUninitialized: true,
  })
)

// Initialize routers

const accountRouter = require("./routes/account")
app.use("/account", accountRouter)

const customerRouter = require("./routes/customer")
app.use("/customer", customerRouter) // authenticationMW IMPLEMENT WHEN LOG IN FEATURE IS READY

const dealerRouter = require("./routes/dealer")
app.use("/dealer", dealerRouter) // authenticationMW IMPLEMENT WHEN LOG IN FEATURE IS READY

const mustacheExpress = require("mustache-express")
// setting up Express to use Mustache Express as template pages
app.engine("mustache", mustacheExpress())
// the pages are located in views directory
app.set("views", "./views")
// extension will be .mustache
app.set("view engine", "mustache")

app.use(express.static("public"))

let PORT = 8000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

app.get("/", (req, res) => {
  res.render("home")
})

app.get("/error", (req, res) => {
  res.render("error")
})

app.get("/about-us", (req, res) => {
  res.render("about-us")
})

app.get("/contact-us", (req, res) => {
  res.render("contact-us")
})
