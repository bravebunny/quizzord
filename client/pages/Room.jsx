var React = require('react')
var app = require('ampersand-app')

var EnrollForm = require('../views/room/EnrollForm.jsx')
var PlayerList = require('../views/room/PlayerList.jsx')

module.exports = React.createClass({
  displayName: 'Room',
  getInitialState: function () {
    return {
      roomId: this.props.room,
      status: 'anonymous',
      players: [],
      me: {}
    }
  },
  componentDidMount: function () {
    var self = this
    app.socket.on('room', function (data) {
      if (data.roomId !== self.state.roomId) {
        return
      }

      console.log('room', data)

      self.setState({
        players: data.room.players
      })
    })

    app.socket.on('room:players:enroll_confirmed', function (data) {
      console.log('room:players:enroll_confirmed', data)
      if (data.roomId !== self.state.roomId) {
        return
      }
      if (data.player.id === self.state.me.id) {
        console.log('enroll confirmed')
        self.setState({status: 'enrolled'})
      }
    })

    app.socket.emit('room:get', {
      roomId: this.state.roomId
    })

    window.onbeforeunload = function () {
      self.componentWillUnmount()
    }
  },
  componentWillUnmount: function () {
    app.socket.emit('room:players:leave', {
      roomId: this.state.roomId,
      player: this.state.me
    })
  },
  handleEnroll: function (data) {
    var me = {
      id: data.name,
      name: data.name
    }

    this.setState({me: me})
    app.socket.emit('room:players:enroll', {
      roomId: this.state.roomId,
      player: me
    })
  },
  render: function () {
    var content

    if (this.state.status === 'anonymous') {
      content = (
        <EnrollForm onChange={this.handleEnroll}/>
      )
    }

    return (
      <div>
        <h1>Room {this.state.roomId}</h1>

        <PlayerList players={this.state.players}/>

        {content}
      </div>
    )
  }
})
