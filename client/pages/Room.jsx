var React = require('react')
var app = require('ampersand-app')

var EnrollForm = require('../views/room/EnrollForm.jsx')
var PlayerList = require('../views/room/PlayerList.jsx')
var Game = require('../views/room/Game.jsx')

var MIN_PLAYERS = 1

module.exports = React.createClass({
  displayName: 'Room',
  propTypes: {
    room: React.PropTypes.string
  },
  getInitialState: function () {
    return {
      roomId: this.props.room,
      gameStatus: 'waiting',
      playerStatus: 'anonymous',
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

      self.setState({
        players: data.room.players,
        isLeader: data.room.leader === self.state.me.id
      })
    })

    app.socket.on('room:players:enroll_confirmed', function (data) {
      console.log('room:players:enroll_confirmed', data)
      if (data.roomId !== self.state.roomId) {
        return
      }
      if (data.player.id === self.state.me.id) {
        console.log('enroll confirmed')
        self.setState({playerStatus: 'enrolled'})
      }
    })

    app.socket.on('room:game:start', function (data) {
      console.log('room:game:start', data)
      if (data.roomId !== self.state.roomId) {
        return
      }
      self.setState({gameStatus: 'playing'})
    })

    app.socket.on('room:game:end', function (data) {
      console.log('room:game:end', data)
      if (data.roomId !== self.state.roomId) {
        return
      }
      self.setState({gameStatus: 'ended'})
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
  handleStartGameClick: function () {
    app.socket.emit('room:game:start', {
      roomId: this.state.roomId
    })
  },
  render: function () {
    var mainContent, sideContent, mainControls

    if (this.state.playerStatus === 'anonymous') {
      sideContent = (<EnrollForm onChange={this.handleEnroll}/>)
    }

    if (this.state.gameStatus === 'waiting') {
      if (this.state.players.length < MIN_PLAYERS) {
        mainContent = (<span>Waiting for more players to join...</span>)
      } else if (this.state.isLeader) {
        mainControls = (<button className='btn btn-primary' onClick={this.handleStartGameClick}>Start game!</button>)
      } else {
        mainContent = (<span>Waiting for leader to start the game...</span>)
      }
    }

    if (this.state.gameStatus === 'playing' || this.state.gameStatus === 'ended') {
      mainContent = (<Game me={this.state.me} roomId={this.state.roomId} players={this.state.players}/>)
    }

    if (this.state.gameStatus === 'ended' && this.state.isLeader) {
      mainControls = (<button className='btn btn-primary' onClick={this.handleStartGameClick}>Restart game!</button>)
    }

    return (
      <div className='row'>
        <div className='col-md-8'>
          <h2>#{this.state.roomId}</h2>
          {mainContent}
          {mainControls}
        </div>
        <div className='col-md-4'>
          <PlayerList players={this.state.players}/>
          {sideContent}
        </div>
      </div>
    )
  }
})
