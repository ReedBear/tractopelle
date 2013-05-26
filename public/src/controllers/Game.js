define([
  'base/Controller',
  'base/GameComponent',
  'box2d',
  'game/Player',
  'game/Arena'
], function(
  Controller,
  GameComponent,
  Box2D,
  Player,
  Arena
) {

  var GameController = GameComponent.extend({

    world: null,
    scale: 10,

    thePlayer: null,
    players: [],

    /**
    * Unpack & config box2d
    **/
    initialize: function(opt) {
      var self = this;

      GameComponent.prototype.initialize.call(this, opt);

      this.scene = opt.scene;
      this.update = _.bind(this.update, this);

      this.initWorld();

      this.mainPlayer = new Player({
        controller: this
      });

      this.arena = new Arena({
        controller: this
      });

      this.startDrawingLoop();

    },

    startDrawingLoop: function() {
      this.running = true;
      requestAnimationFrame(this.update);
    },

    stopDrawingLoop: function() {
      this.running = false;
    },

    update: function() {

      if (!this.running) return;

      this.world.Step (
        1 / 60,   //frame-rate
        10,       //velocity iterations
        10        //position iterations
      );
      this.world.DrawDebugData();
      this.world.ClearForces();

      requestAnimationFrame(this.update);
    },

    initWorld: function() {

      if(!this.scene) {
        throw new Error("Need a scene to create a World")
      }

      /**
      * Init the world
      **/
      this.world = new this.b2d.World(
        new this.b2d.Vec2(0, 0),   //gravity
        true                //allow sleep
      );

      //setup debug draw
      var debugDraw = new this.b2d.DebugDraw();
      debugDraw.SetSprite(this.scene.getContext());
      debugDraw.SetDrawScale(this.scale);
      debugDraw.SetFillAlpha(0.3);
      debugDraw.SetLineThickness(1.0);
      debugDraw.SetFlags(this.b2d.DebugDraw.e_shapeBit | this.b2d.DebugDraw.e_jointBit);

      this.world.SetDebugDraw(debugDraw);
    }
  });

  return GameController;
});