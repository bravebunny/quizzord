var pack = require('./package')

var config = {
  port: process.env.PORT || 9090
}

config.flickr = {
  key: process.env.QUIZZORD_FLICKR_KEY,
  secret: process.env.QUIZZORD_FLICKR_SECRET
}

config.bunyan = {
  name: pack.name,
  level: process.env.QUIZZORD_LOG_LEVEL || 'trace'
}

module.exports = config
