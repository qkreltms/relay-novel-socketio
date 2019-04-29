module.exports = io => {
  const channal = io.of('/mainpage')
  const mainPage = 'mainpage'
  let sockets = []
  let rooms = new Set()
  channal.on('connection', socket => {
    sockets.push(socket)

    console.log(mainPage + ' 에 접속중 :', sockets.length)

    socket.on('join', () => {
      socket.join(mainPage)

      console.log(`${mainPage} 에 조인함`)
    })

    // data: {id: string, writerLimit: string, title: string, desc: string}
    socket.on('create', room => {
      if (!rooms.has(room.id)) {
        rooms.add(room.id)
        // 방을 만들 시 mainPage에 접속해있는 유저에게 방 만들었다고 알려줌
        channal.to(mainPage).emit('createdRoom', room)
        require('./channals')(io, room.id)

        console.log(mainPage + ' 에서 방 생성' + JSON.stringify(room))
      }
    })

    socket.on('joinChannal', room => {
      if (!rooms.has(room.id)) {
        rooms.add(room.id)
        require('./channals')(io, room.id)

        console.log(`${mainPage} 에서 ${room.id} 에 접속함`)
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
