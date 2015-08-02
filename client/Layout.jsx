var React = require('react')
var app = require('ampersand-app')
var localLinks = require('local-links')
var ampersandMixin = require('ampersand-react-mixin')

module.exports = React.createClass({
  mixins: [ampersandMixin],

  displayName: 'Layout',

  propTypes: {
    children: React.PropTypes.element.isRequired
  },

  onClick: function (event) {
    var pathname = localLinks.getLocalPathname(event)
    if (pathname) {
      event.preventDefault()
      app.router.history.navigate(pathname, { trigger: true })
    }
  },

  render: function () {
    return (
      <div onClick={this.onClick}>
        <div className='container header'>
          <div className='logo'>
            <a href='/'>
              Quizzord
            </a>
          </div>
        </div>
        <div className='container'>
          {this.props.children}
        </div>
      </div>
    )
  }
})
