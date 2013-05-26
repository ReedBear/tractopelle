define([
  'backbone'
],
function(
  Backbone
) {
  return Backbone.View.extend({
    
    tagName     : 'canvas',
    id          : 'scene',
    className   : '',
    attributes  : '',
    context     : null,

    initialize: function(opt) {
      var self = this;
      this.context = this.el.getContext('2d');

      Backbone.View.prototype.initialize.call(this, opt);
    },

    render: function() {
      if(!this.el.parentNode) {
        $('body').append(this.el);
      }
    },

    getContext: function() {
      return this.context;
    },
    show: function() {
      this.$el.show();
    },
    hide: function() {
      this.$el.hide();
    }
  });
});