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

  questions.generateQuestions({ n: options.questions || 3 }, function (err, questions) {
    if (err) {
      return callback(err)
    }

    console.log('generated questions', questions)

    games[roomId] = {
      roomId: roomId,
      questions: questions,
      start: new Date()
    }

    callback(null, games[roomId])
  })
}

module.exports = Game
