const socketConfing = require('../config/socket')

module.exports = (server) => {
  const io = require('socket.io')(server, socketConfing)

  // TODO: 원인 모르는 접속 끊기는 문제 해결
  require('./routes/mainpage')(io)
  require('./routes/channals')(io)
}
