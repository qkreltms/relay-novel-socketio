module.exports = io => {
  const room = io.of('/novelpage')
  const novelPage = 'novelPage'
  let sockets = []

  room.on('connection', socket => {
    sockets.push(socket)
    console.log(`socket: ${socket.id} 생성됨`)
    console.log('현재 소켓의 길이', sockets.length)

    socket.on('join', () => {
      socket.join(novelPage)
      console.log(`${novelPage}에 조인함`)
    })

    // @desc: 방을 만들 시 novelPage에 접속해있는 유저에게 방 만들었다고 알려줌
    // @params: data: {roomId: number, msg: string}
    socket.on('create', data => {
      room.to(novelPage).emit('message', data)
      console.log(JSON.stringify(data) + '방 생성')
    })

    socket.on('leave', () => {
      socket.leave(novelPage)
      console.log(`${novelPage} 에서 떠남`)
    })

    socket.on('disconnect', () => {
      sockets.splice(sockets.indexOf(socket), 1)
      socket.leave(novelPage)
      console.log(`${novelPage} 디스커넥트`)
    })

    socket.on('error', err => {
      console.log('에러 발생:', err)
    })
  })
}
