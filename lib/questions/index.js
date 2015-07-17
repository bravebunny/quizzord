module.exports = {
  text: require('./text'),
  images: require('./images'),
  generateQuestion: function () {
    return this.text.generateQuestion()
  },
  generateQuestions: function (n) {
    var questions = []
    for (var i = 0; i < n; i++) {
      questions.push(this.generateQuestion())
    }
    return questions
  }
}
