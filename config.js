var pack = require('./package')

var config = {
  port: 9090 || process.env.QUIZZORD_PORT
}

config.flickr = {
  key: process.env.QUIZZORD_FLICKR_KEY,
  secret: process.env.QUIZZORD_FLICKR_SECRET
}

config.bunyan = {
  name: pack.name,
  level: process.env.CANNON_LOG_LEVEL || 'trace'
}

module.exports = config
