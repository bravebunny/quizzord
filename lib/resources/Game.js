var _ = require('lodash')
var log = require('../helpers/logger')
var questions = require('./questions')

var QUESTION_TIMEOUT = 10000
var QUESTIONS_INTERVAL = 2000

var Game = function (socket, room, options) {
  this.socket = socket

  this.roomId = room.id
  this.players = room.players
  this.rounds = []

  this.currentRoundIndex = 0

  this.initialize(options)
}

Game.prototype.initialize = function (options) {
  var self = this

  options = options || {}
  questions.generateQuestions({ n: options.questions || 3 }, function (err, questions) {
    if (err) {
      return log.error({ err: err, roomId: self.roomId, options: options }, 'error initializing game')
    }

    log.info({ roomId: self.roomId, questions: questions }, 'game initialization done')

    self.questions = questions

    self.broadcast('room:game:start', { roomId: self.roomId, game: {} })

    self.startRound()
  })
}

Game.prototype.broadcast = function (eventName, data) {
  data = data || {}
  data.roomId = this.roomId
  this.socket.emit(eventName, data)
}

Game.prototype.startRound = function () {
  var self = this

  log.info({ roomId: this.roomId }, 'start round')

  var question = this.questions[this.currentRoundIndex]
  var round = {
    question: question,
    startTime: new Date(),
    responses: {},
    finished: []
  }
  round.timeout = setTimeout(function () {
    self.endRound()
  }, QUESTION_TIMEOUT)

  self.rounds.push(round)

  this.broadcast('room:game:round:start', {
    question: {
      kind: question.kind,
      question: question.question,
      options: question.options,
      imageUrl: question.imageUrl
    }
  })
}

Game.prototype.endRound = function () {
  var self = this

  log.info({ roomId: this.roomId }, 'end round')

  var round = this.rounds[this.currentRoundIndex]

  this.currentRoundIndex++

  this.broadcast('room:game:round:end', { responses: round.responses })

  if (this.currentRoundIndex >= this.questions.length) {
    return setTimeout(function () {
      self.endGame()
    }, QUESTIONS_INTERVAL)
  }

  setTimeout(function () {
    self.startRound()
  }, QUESTIONS_INTERVAL)
}

Game.prototype.endGame = function () {
  var results = {}

  var winner = {
    points: 0
  }

  this.rounds.forEach(function (round) {
    _.forIn(round.responses, function (response, playerId) {
      results[playerId] = results[playerId] || {points: 0, correct: 0}
      if (response.isCorrect) {
        results[playerId].points += QUESTION_TIMEOUT - response.time
        results[playerId].correct++

        if (results[playerId].points > winner.points) {
          winner.points = results[playerId].points
          winner.playerId = playerId
        }
      }
    })
  })

  if (winner.playerId) {
    results[winner.playerId].isWinner = true
  }

  log.info({ roomId: this.roomId, results: results }, 'end game')

  this.broadcast('room:game:end', {results: results})
}

Game.prototype.handleAnswer = function (data) {
  log.info({ roomId: this.roomId, data: data }, 'handle answer')

  var round = this.rounds[this.currentRoundIndex]

  round.finished.push(data.playerId)
  round.responses[data.playerId] = {
    playerId: data.playerId,
    answer: data.answer,
    time: new Date() - round.startTime,
    isCorrect: data.answer === round.question.correct
  }

  if (round.finished.length === this.players.length) {
    clearTimeout(round.timeout)
    this.endRound()
  }
}

module.exports = Game
