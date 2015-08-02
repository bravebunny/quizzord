var app = require('ampersand-app')
var React = require('react')

module.exports = React.createClass({
  displayName: 'PublicPage',

  onMainRoomClick: function (event) {
    event.preventDefault()
    app.router.history.navigate('/r/main')
  },

  render: function () {
    return (
      <div className='container'>
        <h1>Welcome!</h1>
        <p>
          <a onClick={this.onMainRoomClick} className='btn btn-lg btn-primary'>
            Go to main room
          </a>
        </p>
      </div>
    )
  }
})
