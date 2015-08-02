var React = require('react')

module.exports = React.createClass({
  displayName: 'EnrollForm',
  propTypes: {
    onChange: React.PropTypes.func
  },
  handleSubmit: function (ev) {
    ev.preventDefault()
    var name = this.refs.name.getDOMNode().value
    this.props.onChange({ name: name })
  },
  render: function () {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Enroll</h2>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input id='name' type='name' ref='name' className='form-control' placeholder='Name'/>
        </div>
        <button type='submit' className='btn btn-default'>Submit</button>
      </form>
    )
  }
})
