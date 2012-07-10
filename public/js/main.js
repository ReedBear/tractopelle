require(['CanvasView',
         'GameHandler'], function(CanvasView, GameHandler) {

  var canvas = new CanvasView({
    id: 'scene',
    attributes: {
      width: '800px',
      height: '600px'
    }
  });

  GameHandler.init(canvas.el);
});