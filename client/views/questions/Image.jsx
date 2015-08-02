var React = require('react')

module.exports = React.createClass({
  displayName: 'ImageQuestion',
  propTypes: {
    onAnswer: React.PropTypes.func,
    question: React.PropTypes.object
  },
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
          return (<div className='option'><button className='btn btn-lg btn-primary' disabled><b>{o}</b></button></div>)
        }
        return (<div className='option'><button className='btn btn-lg' disabled>{o}</button></div>)
      }
      return (
        <div className='option'>
          <button data-value={JSON.stringify(i)} className='btn btn-lg btn-primary' onClick={self.handleClick}>{o}</button>
        </div>)
    })

    return (
      <div className='image-question'>
        <h4>{this.props.question.question}</h4>
        <div className='row'>
          <div className='col-md-8'>
            <img src={this.props.question.imageUrl} />
          </div>
          <div className='col-md-4'>
            <div className='options'>{options}</div>
          </div>
        </div>
      </div>
    )
  }
})
