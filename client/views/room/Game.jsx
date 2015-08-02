var React = require('react')
var app = require('ampersand-app')
var _ = require('lodash')

var TextQuestion = require('../questions/Text.jsx')
var ImageQuestion = require('../questions/Image.jsx')

module.exports = React.createClass({
  displayName: 'Game',
  propTypes: {
    roomId: React.PropTypes.string,
    me: React.PropTypes.object
  },
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
        status: 'end-game',
        results: data.results
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
      if (this.state.question && this.state.question.kind === 'image') {
        return (<ImageQuestion question={this.state.question} onAnswer={this.handleAnswer}/>)
      }
    }

    var list = []

    if (this.state.status === 'end-round') {
      _.forIn(this.state.responses, function (response, playerId) {
        list.push((
          <li>
            {playerId}: {response.isCorrect ? 'correct' : 'incorrect'} ({response.time / 1000}s)
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
      _.forIn(this.state.results, function (result, playerId) {
        list.push((
          <li>
            {playerId}: {result.points} points {result.isWinner ? 'Winner!' : ''}
          </li>
        ))
      })

      return (
        <div>
          <h4>Results</h4>
          <ul>{list}</ul>
          <b>The end!</b>
        </div>
      )
    }
    return (<h4>Loading...</h4>)
  }
})
