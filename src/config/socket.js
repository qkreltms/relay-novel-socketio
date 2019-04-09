const config = require('../config')

// pingTimeout + pingInterval 클라이언트가 기다려야 되는 시간

module.exports = {
  cookie: config.COOKIE_SID || 'io',
  httpCompression: true,
  pingTimeout: 5000,
  pingInterval: 25000,
  upgradeTimeout: 10000,
  origins: ['http://localhost:3000'] // TODO: 배포시 수정하기
}
