var React = require('react')
var app = require('ampersand-app')

var EnrollForm = require('../views/room/EnrollForm.jsx')

module.exports = React.createClass({
  displayName: 'Room',
  getInitialState: function () {
    return { state: 'anonymous' }
  },
  componentDidMount: function () {
    var self = this
    app.socket.on('play_track', function (data) {
      if (data.room !== self.props.room) {
        return
      }

      console.log('play_track!', data)

      self.setState({
        currentTrack: { type: data.type, url: data.url }
      })
    })
  },
  handleEnroll: function (data) {
    console.log('enroll', data)
  },
  render: function () {
    var content

    if (this.state.state === 'anonymous') {
      content = (
        <EnrollForm onChange={this.handleEnroll}/>
      )
    }

    return (
      <div>
        <h1>Room {this.props.room}</h1>

        {content}
      </div>
    )
  }
})
