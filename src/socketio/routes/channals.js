module.exports = (io, roomId) => {
  const room = io.of(`/${roomId}`)
  const novelPage = roomId
  let sockets = []

  room.on('connection', socket => {
    sockets.push(socket)
    console.log(`socket: ${socket.id} 생성됨`)
    console.log('현재 소켓의 길이', sockets.length)

    socket.on('join', () => {
      socket.join(novelPage)
      console.log(`${novelPage}에 조인함`)
    })

    // @desc: 글 쓸시 접속해있는 유저에게 글 뿌려줌
    // @params: data: {roomId: number, msg: string}
    socket.on('create', data => {
      room.to(novelPage).emit('message', data)
      console.log(JSON.stringify(data) + '글 씀')
    })

    socket.on('leave', () => {
      sockets.splice(sockets.indexOf(socket), 1)
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

    // @desc 방 글쓰기 참여
    // @params: data: {roomId: number}
    socket.on('joinToWrite', data => {
      room.to(novelPage).emit('message', data)
      console.log(JSON.stringify(data) + '방에 참가함')
    })
  })
}
