var React = require('react')
var app = require('ampersand-app')

var TextQuestion = require('../questions/Text.jsx')

module.exports = React.createClass({
  displayName: 'Game',
  getInitialState: function () {
    return {}
  },
  componentDidMount: function () {
    var self = this
    app.socket.on('room:game:round:start', function (data) {
      console.log('room:game:round:start', data)
      self.setState({question: data.question})
    })
    app.socket.on('room:game:round:end', function (data) {
      console.log('room:game:round:end', data)
    })
  },
  handleAnswer: function (answer) {
    console.log('handleAnswer', answer)
    app.socket.emit('room:game:round:answer', {
      roomId: this.state.roomId,
      playerId: this.props.me.id,
      answer: answer
    })
  },
  render: function () {
    var content = (<h4>Loading...</h4>)

    if (this.state.question && this.state.question.kind === 'text') {
      content = (<TextQuestion question={this.state.question} onAnswer={this.handleAnswer}/>)
    }
    return (
      <div>
        {content}
      </div>
    )
  }
})
