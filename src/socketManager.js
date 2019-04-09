const socketConfing = require('./config/socket')

module.exports = (server) => {
  const io = require('socket.io')(server, socketConfing)

  io.on('connection', socket => {
    socket.on('create', data => {
      console.log(data)
      socket.join('room')
      io.to('room').emit('create', data.roomId)
    })
  })
}
