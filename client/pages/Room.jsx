var React = require('react')
var app = require('ampersand-app')

module.exports = React.createClass({
  displayName: 'Room',
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
  render: function () {
    return (
      <div>
        <h1>Room {this.props.room}</h1>
      </div>
    )
  }
})
