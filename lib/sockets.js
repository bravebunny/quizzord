var SocketIO = require('socket.io')

var sockets = {}

sockets.start = function (server) {
  var self = this

  this.io = SocketIO.listen(server.listener)

  this.io.on('connection', function (socket) {
    console.log('New socket connection!')

    socket.on('user:new', function () { self.handleNewUser.apply(self, arguments) })
  })
}

sockets.handleNewUser = function (data) {
  console.log('user:new', data)

  this.io.emit('game:start', data)
}

module.exports = sockets
