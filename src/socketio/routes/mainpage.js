module.exports = io => {
  const room = io.of('/mainpage')
  const mainPage = 'mainpage'
  let sockets = []
  let rooms = new Set()
  room.on('connection', socket => {
    sockets.push(socket)

    console.log(mainPage + ' 에 접속중 :', sockets.length)

    socket.on('join', () => {
      socket.join(mainPage)

      console.log(`${mainPage} 에 조인함`)
    })

    // @desc: 방을 만들 시 mainPage에 접속해있는 유저에게 방 만들었다고 알려줌
    socket.on('create', data => {
      room.to(mainPage).emit('message', data.roomId)
      require('./channals')(io, data.roomId)

      console.log(mainPage + ' 에서 방 생성' + JSON.stringify(data))
    })

    socket.on('joinChannal', data => {
      if (!rooms.has(data.roomId)) {
        rooms.add(data.roomId)
        require('./channals')(io, data.roomId)

        console.log(`${mainPage} 에서 ${data.roomId} 에 접속함`)
      }
    })

    socket.on('leave', () => {
      sockets.splice(sockets.indexOf(socket), 1)
      socket.leave(mainPage)

      console.log(`${mainPage} 에서 떠남`)
    })

    socket.on('disconnect', () => {
      sockets.splice(sockets.indexOf(socket), 1)
      socket.leave(mainPage)

      console.log(`${mainPage} 디스커넥트`)
    })

    socket.on('error', err => {
      console.log(`${mainPage} 에러발생`, err)
    })
  })
}
