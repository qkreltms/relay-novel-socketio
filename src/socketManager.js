const socketConfing = require('./config/socket')

module.exports = (server) => {
  const io = require('socket.io')(server, socketConfing)

  // TODO: 코드 분리
  // TODO: 원인 모르는 끊기는 문제 해결

  const room = io.of('/room')
  const mainPage = 'mainpage'

  room.on('connection', socket => {
    socket.on('join', () => {
      socket.join(mainPage)
      console.log(`${mainPage}에 조인함`)
    })

    /**
     * @desc: 방을 만들 시 mainPage에 접속해있는 유저에게 방 만들었다고 알려줌
     *  */ 
    socket.on('create', data => {
      room.to(mainPage).emit('message', data.roomId)
      console.log(JSON.stringify(data) + "방 생성")
    })

    socket.on('leave', () => {
      socket.leave(mainPage)
      console.log(`${mainPage} 에서 떠남`)
    })

    socket.on('disconnect', () => {
      socket.leave(mainPage)
      console.log(`${mainPage} 디스커넥트`)
    })
  })
}
