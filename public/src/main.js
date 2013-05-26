require.config({
  baseUrl : 'src/',
  paths   : {
    underscore    : 'lib/underscore',
    backbone      : 'lib/backbone',
    jquery        : 'lib/jquery',
    box2d         : 'lib/box2d',
    'socket.io'   : 'http://192.168.1.43:27042/socket.io/socket.io'
  },
  shim    : {
    backbone    : {
      deps        : [ 'jquery', 'underscore' ],
      exports     : 'Backbone'
    },
    underscore  : {
      exports     : '_'
    }
  }
});

require([
  'controllers/App'
], function(
  App
) {
  var app = new App();
  window.app = app;
});