var Router = require('ampersand-router')
var React = require('react')
var Layout = require('./Layout.jsx')
var PublicPage = require('./pages/Public.jsx')
var MessagePage = require('./pages/Message.jsx')
var RoomPage = require('./pages/Room.jsx')

module.exports = Router.extend({
  renderPage: function (Page, opts) {
    var main = (
      <Layout>
        <Page {...opts}/>
      </Layout>
    )

    React.render(main, document.body)
  },

  routes: {
    '': 'home',
    'r/:roomname': 'room',
    '*404': 'fourOhFour'
  },

  home: function () {
    React.render(<PublicPage/>, document.body)
  },

  room: function (roomname) {
    this.renderPage(RoomPage, {room: roomname})
  },

  fourOhFour: function () {
    this.renderPage(MessagePage, {title: '404', message: 'Nothing to see here, sorry.'})
  }
})
