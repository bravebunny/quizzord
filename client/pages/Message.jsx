var React = require('react')

module.exports = React.createClass({
  displayName: 'MessagePage',

  propTypes: {
    title: React.PropTypes.string,
    message: React.PropTypes.string.isRequired
  },

  render: function () {
    return (
      <div className='jumbotron'>
        <h1>{this.props.title}</h1>
        <p>{this.props.message}</p>
      </div>
    )
  }
})
