module.exports = (io, roomId) => {
  const room = io.of(`/${roomId}`)
  const pageName = roomId
  let sockets = []

  room.on('connection', socket => {
    room.clients((err, clients) => {
      if (err) throw err
      console.log(clients)
    })

    console.log('현재 소켓의 길이', sockets.length)

    // data: {id: string, userId: string}
    socket.on('join', data => {
      socket.join(data.id)

      console.log(`${data.id}에 조인함`, data)
    })

    // @desc: 글 쓸시 접속해있는 유저에게 글 뿌려줌
    // @params: data: {roomId: string, msg: string}
    socket.on('message', data => {
      room.to(pageName).emit('message', data)

      console.log(JSON.stringify(data) + '글 씀')
    })

    socket.on('leave', () => {
      sockets.splice(sockets.indexOf(socket), 1)
      socket.leave(pageName)

      console.log(`${pageName} 에서 떠남`)
    })

    socket.on('disconnect', () => {
      sockets.splice(sockets.indexOf(socket), 1)
      socket.disconnect(true)

      console.log(`${pageName} 디스커넥트`)
    })

    socket.on('error', err => {
      socket.disconnect(true)

      console.log('에러 발생:', err)
    })
  })
}
