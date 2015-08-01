var SocketIO = require('socket.io')
var Room = require('./models/room')
var log = require('./helpers/logger')

var Game = require('./resources/Game')
var games = {}

var sockets = {}

sockets.start = function (server) {
  var self = this

  this.io = SocketIO.listen(server.listener)

  this.io.on('connection', function (socket) {
    log.info('New socket connection!')

    socket.on('room:get', function (data) {
      log.info({ data: data }, 'room:get')

      Room.get(data.roomId, function (err, room) {
        if (err) {
          return log.error({ err: err, data: data }, 'error getting room')
        }

        socket.emit('room', {roomId: room.id, room: room})
      })
    })

    socket.on('room:players:enroll', function (data) {
      log.info({ data: data }, 'room:players:enroll')

      Room.addPlayer(data.roomId, data.player, function (err, room) {
        if (err) {
          return log.error({ err: err, data: data }, 'error adding player to room')
        }

        socket.emit('room:players:enroll_confirmed', {roomId: room.id, room: room, player: data.player})
        self.io.emit('room', {roomId: room.id, room: room})
      })
    })

    socket.on('room:players:leave', function (data) {
      log.info({ data: data }, 'room:players:leave')

      Room.removePlayer(data.roomId, data.player.id, function (err, room) {
        if (err) {
          return log.error({ err: err, data: data }, 'error removing player from room')
        }

        self.io.emit('room', {roomId: room.id, room: room})
      })
    })

    socket.on('room:game:start', function (data) {
      log.info({ data: data }, 'room:game:start')

      Room.get(data.roomId, function (err, room) {
        if (err) {
          return log.error({ err: err, data: data }, 'error getting room')
        }

        games[data.roomId] = new Game(self.io, room, data.options)
      })
    })

    socket.on('room:game:round:answer', function (data) {
      log.info({ data: data }, 'room:game:round:answer')

      games[data.roomId].handleAnswer(data)
    })

  })
}

module.exports = sockets
