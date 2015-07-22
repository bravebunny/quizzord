var Hapi = require('hapi')
var sockets = require('./sockets')
var config = require('../config')

var server = new Hapi.Server()
server.connection({ port: config.port })
sockets.start(server)

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: function (request, reply) {
    reply.file('build/index.html')
  }
})

server.route({
  method: 'GET',
  path: '/main.js',
  handler: function (request, reply) {
    reply.file('build/main.js')
  }
})

server.route({
  method: 'GET',
  path: '/vendors.js',
  handler: function (request, reply) {
    reply.file('build/vendors.js')
  }
})

server.route({
  method: 'GET',
  path: '/main.css',
  handler: function (request, reply) {
    reply.file('build/main.css')
  }
})

server.start(function () {
  console.log({url: server.info.uri}, 'Hapi server started!')
})
