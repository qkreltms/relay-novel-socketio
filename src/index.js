const express = require('express')
const app = express()
const helmet = require('helmet')
const config = require('./config')
const http = require('http')
const server = http.createServer(app)
require('./socketManager')(server)

app.use(helmet())
server.listen(config.PORT, () => {
  console.log(`listening port: ${config.PORT}...`)
})
