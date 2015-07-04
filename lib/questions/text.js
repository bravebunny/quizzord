var TextQuestion = {}

TextQuestion.generateQuestion = function () {
  return {
    kind: 'text',
    question: 'Who am I?',
    options: [
      'siri',
      'google now',
      'quizzord',
      'banana',
      'atum'
    ],
    correct: 2
  }
}

module.exports = TextQuestion
