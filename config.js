var config = {
  port: 9090 || process.env.QUIZZORD_PORT
}

config.flickr = {
  key: process.env.QUIZZORD_FLICKR_KEY,
  secret: process.env.QUIZZORD_FLICKR_SECRET
}

module.exports = config
