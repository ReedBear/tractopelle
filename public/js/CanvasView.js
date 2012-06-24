define(function() {
  return Backbone.View.extend({
    
    tagName: 'canvas',
    id: 'scene',
    className: '',
    attributes: '',

    $el: null,

    initialize: function() {
      var self = this;
      self.$el = $(self.el);
      self.render();
    },

    render: function() {
      var self = this;
      $('body').append(self.el);
    }
  })
});