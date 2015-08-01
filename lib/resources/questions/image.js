var animals = require('animals')
var Flickr = require('flickrapi')
var log = require('../../helpers/logger')

var config = require('../../../config')

var flickrOptions = {
  api_key: config.flickr.key,
  secret: config.flickr.secret
}

var flickr

Flickr.tokenOnly(flickrOptions, function (err, _flickr) {
  if (err) {
    log.error({ err: err }, 'Error initializing flickr api')
  }

  log.info('flickr api ready')
  flickr = _flickr
})

function _photoURL (photo) {
  return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg'
}

function _getOptions (topic) {
  topic = topic || 'animals'

  switch (topic) {
    case 'animals':
    default:
      return [animals(), animals(), animals(), animals()]
  }
}

function _getRandomNumber (min, max) {
  return min + Math.round(Math.random() * max)
}

function _getRandomElement (array) {
  var index = _getRandomNumber(0, array.length - 1)
  return array[index]
}

var ImageQuestion = {}

ImageQuestion.generateQuestion = function (topic, callback) {
  var options = _getOptions(topic)
  var correctOption = _getRandomElement(options)

  var question = {
    kind: 'image',
    question: 'What is this?',
    options: options,
    correct: options.indexOf(correctOption)
  }

  log.info({ question: question }, 'generated image question')

  flickr.photos.search({ text: correctOption, page: 1, per_page: 5 }, function (err, result) {
    if (err) {
      log.error({ err: err }, 'error getting', correctOption, 'photos')
      return callback(err)
    }

    question.imageUrl = _photoURL(result.photos.photo[0])

    callback(null, question)
  })
}

module.exports = ImageQuestion
