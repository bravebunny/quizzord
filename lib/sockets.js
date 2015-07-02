var SocketIO = require('socket.io')
var Room = require('./models/room')

var sockets = {}

sockets.start = function (server) {
  var self = this

  this.io = SocketIO.listen(server.listener)

  this.io.on('connection', function (socket) {
    console.log('New socket connection!')

    socket.on('room:get', function (data) {
      console.log('room:get', data)
      Room.get(data.roomId, function (err, room) {
        socket.emit('room', {roomId: room.id, room: room})
      })
    })

    socket.on('room:players:enroll', function (data) {
      console.log('room:players:enroll', data)
      Room.addPlayer(data.roomId, data.player, function (err, room) {
        socket.emit('room:players:enroll_confirmed', {roomId: room.id, room: room, player: data.player})
        self.io.emit('room', {roomId: room.id, room: room})
      })
    })

  socket.on('room:players:leave', function (data) {
    console.log('room:players:leave', data)
    Room.removePlayer(data.roomId, data.player.id, function (err, room) {
      self.io.emit('room', {roomId: room.id, room: room})
    })
  })

  })
}

module.exports = sockets
