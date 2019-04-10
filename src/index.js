const express = require('express')
const app = express()
const helmet = require('helmet')
const config = require('./config')
const http = require('http')

require('./config/development')(app)
app.use(helmet())

const server = http.createServer(app)
require('./socketio/manager')(server)

server.listen(config.PORT, () => {
  console.log(`listening port: ${config.PORT}...`)
})
