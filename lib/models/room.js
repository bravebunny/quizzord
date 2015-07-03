var _ = require('lodash')

var rooms = {}

var Room = {}

function _updateLeader (id) {
  rooms[id].leader = rooms[id].players[0] && rooms[id].players[0].id || null
}

function _assureRoomExists (id) {
  if (!rooms[id]) {
    rooms[id] = { id: id, players: [] }
  }
}

Room.list = function (callback) {
  var list = []

  _.forIn(rooms, function (value, key) {
    list.push(value)
  })

  callback(null, list)
}

Room.get = function (roomId, callback) {
  _assureRoomExists(roomId)
  _updateLeader(roomId)

  var room = rooms[roomId]

  callback(null, room)
}

Room.addPlayer = function (roomId, player, callback) {
  _assureRoomExists(roomId)
  rooms[roomId].players.push(player)
  _updateLeader(roomId)

  callback(null, rooms[roomId])
}

Room.removePlayer = function (roomId, playerId, callback) {
  _assureRoomExists(roomId)
  _.remove(rooms[roomId].players, function (p) { return p.id === playerId })
  _updateLeader(roomId)

  callback(null, rooms[roomId])
}

module.exports = Room
