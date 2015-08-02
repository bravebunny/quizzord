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
        <nav className='navbar navbar-default'>
          <div className='container-fluid'>
            <div className='navbar-header'>
              <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar' aria-expanded='false' aria-controls='navbar'>
                <span className='sr-only'>Toggle navigation</span>
                <span className='icon-bar'></span>
              </button>
              <a className='navbar-brand' href='/'>quizzord</a>
            </div>
            <div id='navbar' className='navbar-collapse collapse'>
              <ul className='nav navbar-nav'>
                <li className='active'><a href='/'>Home</a></li>
                <li><a href='/about'>About</a></li>
              </ul>
              <ul className='nav navbar-nav navbar-right'>
              </ul>
            </div>
          </div>
        </nav>
        <div className='container'>
          {this.props.children}
        </div>
      </div>
    )
  }
})
