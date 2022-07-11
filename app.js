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
app.use("/customer", authenticationMW, customerRouter)

const dealerRouter = require("./routes/dealer")
app.use("/dealer", authenticationMW, dealerRouter)

const path = require("path")

const VIEWS_PATH = path.join(__dirname, "/views")

const mustacheExpress = require("mustache-express")
// setting up Express to use Mustache Express as template pages
app.engine("mustache", mustacheExpress(VIEWS_PATH + "/partials", ".mustache"))
// the pages are located in views directory
app.set("views", VIEWS_PATH)
// extension will be .mustache
app.set("view engine", "mustache")

app.use(express.static("public"))
// app.use((req, res, next) => {
//   firstName = req.session.customerFirstName
//   user = req.session.dealerFirstName

//   next()
// })

let PORT = process.env.PORT || 8080
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
