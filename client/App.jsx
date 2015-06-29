/** @jsx React.DOM */
var React = require('react')
var io = require('socket.io-client')

var App = React.createClass({
  componentWillMount: function () {
    this.socket = window.socket = io()

    this.socket.on('connection', function (socket) {
      console.log('connection open!')
    })

    this.socket.on('game:start', function (data) {
      console.log('game:start')
    })
  },
  render: function () {
    return (
      <h1>banana!</h1>
    )
  }
})

module.exports = App
