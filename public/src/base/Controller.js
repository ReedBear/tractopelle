define([
  'underscore',
  'backbone'
], function(
  _,
  Backbone
) {

  var Controller = function(opt) {
    this.initialize(opt);
  };
  _.extend(Controller.prototype, Backbone.Events, {
    initialize: function(opt) {
      console.info('Controller Created');
    }
  });
  Controller.extend = Backbone.View.extend;

  return Controller;
});