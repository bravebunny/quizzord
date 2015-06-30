var app = require('ampersand-app')
var io = require('socket.io-client')

var Router = require('./Router.jsx')

window.app = app.extend({
  // this is the the whole app initter
  init: function () {
    document.title = 'quizzord'

    var self = window.app = this

    self.initSocket()

    this.router = new Router()
    this.router.history.start({ pushState: true })
  },

  initSocket: function () {
    var self = this

    self.socket = io()

    self.socket.on('connection', function (socket) {
      console.log('connection open!')
    })
  }
})

// run it
app.init()
