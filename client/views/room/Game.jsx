var React = require('react')
var app = require('ampersand-app')
var _ = require('lodash')

var TextQuestion = require('../questions/Text.jsx')

module.exports = React.createClass({
  displayName: 'Game',
  getInitialState: function () {
    return { }
  },
  componentDidMount: function () {
    var self = this
    app.socket.on('room:game:round:start', function (data) {
      console.log('room:game:round:start', data)
      self.setState({
        status: 'playing',
        question: data.question
      })
    })
    app.socket.on('room:game:round:end', function (data) {
      console.log('room:game:round:end', data)
      self.setState({
        status: 'end-round',
        responses: data.responses
      })
    })
    app.socket.on('room:game:end', function (data) {
      console.log('room:game:end', data)
      self.setState({
        status: 'end-game'
      })
    })
  },
  handleAnswer: function (answer) {
    console.log('handleAnswer', answer)
    app.socket.emit('room:game:round:answer', {
      roomId: this.props.roomId,
      playerId: this.props.me.id,
      answer: answer
    })
  },
  render: function () {
    if (this.state.status === 'playing') {
      if (this.state.question && this.state.question.kind === 'text') {
        return (<TextQuestion question={this.state.question} onAnswer={this.handleAnswer}/>)
      }
    }

    if (this.state.status === 'end-round') {
      var list = []
      _.forIn(this.state.responses, function (response, key) {
        list.push((
          <li>
            {response.playerId}: {response.isCorrect ? 'correct' : 'incorrect'} ({response.time / 1000}s)
          </li>
        ))
      })

      return (
        <div>
          <h4>Results</h4>
          <ul>{list}</ul>
        </div>
      )
    }

    if (this.state.status === 'end-game') {
      return (
        <div>
          <h4>The end!</h4>
        </div>
      )
    }
    return (<h4>Loading...</h4>)
  }
})
