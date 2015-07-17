var animals = require('animals')
var Flickr = require('flickrapi')

var config = require('../../config')

var flickrOptions = {
  api_key: config.flickr.key,
  secret: config.flickr.secret
}

Flickr.tokenOnly(flickrOptions, function (err, flickr) {
  // we can now use 'flickr' as our API object,
  // but we can only call public methods and access public data
  //
  var animal = animals()
  flickr.photos.search({ text: animal, page: 1, per_page: 5 }, function (err, result) {
    if (err) {
      return console.log('error getting', animal, 'photos')
    }
    console.log(animal, 'photos', _photoURL(result.photos.photo[0]))
  })
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

console.log('ANIMALS', _getOptions())


var ImagesGame = {}

ImagesGame.generateQuestion = function () {
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
