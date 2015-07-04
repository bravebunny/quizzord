var questions = require('../questions')

var games = {}

var Game = {}

function _assureRoomExists (roomId) {
  if (!games[roomId]) {
    games[roomId] = { roomId: roomId, questions: [] }
  }
}

Game.create = function (roomId, options, callback) {
  _assureRoomExists(roomId)
  options = options || {}

  games[roomId] = {
    roomId: roomId,
    questions: questions.generateQuestions(options.questions || 10),
    start: new Date()
  }

  callback(null, games[roomId])
}

module.exports = Game
