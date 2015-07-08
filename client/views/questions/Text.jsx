var React = require('react')

module.exports = React.createClass({
  displayName: 'TextQuestion',
  getInitialState: function () {
    return {}
  },
  handleClick: function (ev) {
    var data = ev.target.dataset
    var value = JSON.parse(data.value)
    this.setState({answer: value})
    this.props.onAnswer && this.props.onAnswer(value)
  },
  render: function () {
    var self = this
    var options = this.props.question.options.map(function (o, i) {
      if (self.state.answer) {
        if (self.state.answer === i) {
          return (<button className='btn btn-primary' disabled><b>{o}</b></button>)
        }
        return (<button className='btn' disabled>{o}</button>)
      }
      return (<button data-value={JSON.stringify(i)} className='btn btn-primary' onClick={self.handleClick}>{o}</button>)
    })

    return (
      <div>
        <h4>{this.props.question.question}</h4>
        {options}
      </div>
    )
  }
})
