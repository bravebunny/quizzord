var React = require('react')

module.exports = React.createClass({
  displayName: 'TextQuestion',
  handleClick: function (ev) {
    var data = ev.target.dataset;
    console.log('CLICK', data);
    var value = JSON.parse(data.value);
    this.props.onAnswer && this.props.onAnswer(value);
  },
  render: function () {
    var self = this
    var options = this.props.question.options.map(function (o, i) {
      return (<button data-value={JSON.stringify(i)} className='btn btn-primary' onClick={self.handleClick}>{o}</button>)
    });

    return (
      <div>
        <h4>{this.props.question.question}</h4>
        {options}
      </div>
    )
  }
})
