define([
  'base/Controller',
  'views/Scene',
  'controllers/Game'
], function(
  Controller,
  Scene,
  Game
) {

  return Controller.extend({
    initialize: function(opt) {


      this.scene = new Scene({
        id: 'scene',
        attributes: {
          width: '800',
          height: '600'
        }
      });

      Controller.prototype.initialize.call(this,opt);

      this.createGame();
    },

    createGame: function() {
      this.scene.render();
      this.scene.show();

      this.currentGame = new Game({
        scene: this.scene
      });
    }
  });

});