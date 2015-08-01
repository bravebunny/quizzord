var async = require('async')

module.exports = {
  text: require('./text'),
  image: require('./image'),
  generateQuestion: function (options, callback) {
    return this.image.generateQuestion(null, callback)
  },
  generateQuestions: function (options, callback) {
    var self = this
    async.times(options.n, function (n, next) {
      self.generateQuestion(options, next)
    }, callback)
  }
}
