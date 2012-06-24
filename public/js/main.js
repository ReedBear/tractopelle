require(['js/CanvasView.js',
         'js/PhysicsHandler.js'], function(CanvasView, PhysicsHandler) {
    var canvas = new CanvasView({
      id: 'scene',
      attributes: {
        width: '800px',
        height: '600px'
      }
    });
    PhysicsHandler.init(canvas.el);
});