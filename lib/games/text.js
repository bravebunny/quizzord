var TextGame = {}

TextGame.generateQuestion = function () {
  return {
    kind: 'text',
    question: 'Who am I?',
    answers: [
      'siri',
      'google now',
      'quizzord',
      'banana',
      'atum'
    ],
    correct: 2
  }
}
