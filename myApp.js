let express = require("express")
let app = express()
require("dotenv").config()
let bodyParser = require("body-parser")

app.use(function (req, res, next) {
  let method = req.method
  let path = req.path
  let ip = req.ip
  console.log(`${method} ${path} - ${ip}`)
  next()
})

app.get("/", function (req, res) {
  const absPath = __dirname + "/views/index.html"
  res.sendFile(absPath)
})

app.use("/public", express.static(__dirname + "/public"))

app.get("/json", (req, res) => {
  res.json({
    message:
      process.env.MESSAGE_STYLE === "uppercase" ? "HELLO JSON" : "Hello json",
  })
})

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString()
    next()
  },
  (req, res) => {
    res.json({ time: req.time })
  },
)

app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word })
})

app
  .route("/name")
  .get((req, res) => {
    const { first, last } = req.query
    res.json({ name: `${first} ${last}` })
  })
  .post((req, res) => {
    const { first, last } = req.body
    res.json({ name: `${first} ${last}` })
  })

app.use(bodyParser.urlencoded({ extended: false }))

module.exports = app
