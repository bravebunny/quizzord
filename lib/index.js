var Hapi = require('hapi')
var sockets = require('./sockets')

var server = new Hapi.Server()
server.connection({ port: 8000 })
sockets.start(server)

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: 'build',
      listing: true
    }
  }
})

server.start(function () {
  console.log({url: server.info.uri}, 'Hapi server started!')
})
