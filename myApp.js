let express = require("express")
let app = express()
require("dotenv").config()

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

module.exports = app
