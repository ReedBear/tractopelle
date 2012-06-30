define(['Player'], function(Player) {
  var GameHandler = {

    world: null,
    canvas: null,
    context: null,
    scale: 10,

    thePlayer: null,
    players: [],

    /**
    * Unpack & config box2d
    **/
    init: function(canvas) {
      var self = this;
      var b2Vec2 = Box2D.Common.Math.b2Vec2,
          b2BodyDef = Box2D.Dynamics.b2BodyDef,
          b2Body = Box2D.Dynamics.b2Body,
          b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
          b2Fixture = Box2D.Dynamics.b2Fixture,
          b2World = Box2D.Dynamics.b2World,
          b2MassData = Box2D.Collision.Shapes.b2MassData,
          b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
          b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
          b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

      /**
      * Init the world
      **/
      this.canvas = canvas;
      this.context = canvas.getContext("2d");
      this.world = new b2World(
        new b2Vec2(0, 0),   //gravity
        true                 //allow sleep
      );

      //setup debug draw
      var debugDraw = new b2DebugDraw();
      debugDraw.SetSprite(this.context);
      debugDraw.SetDrawScale(this.scale);
      debugDraw.SetFillAlpha(0.3);
      debugDraw.SetLineThickness(1.0);
      debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
      this.world.SetDebugDraw(debugDraw);

      this.thePlayer = new Player();
      this.thePlayer.addToWorld(this.world);


      // Start the loop
      requestAnimFrame(GameHandler.update);
      this.listenKeyboard();
    },

    update: function() {
      var self = GameHandler;

      self.world.Step (
        1 / 60,   //frame-rate
        10,       //velocity iterations
        10        //position iterations
      );
      self.world.DrawDebugData();
      self.world.ClearForces();

      requestAnimFrame(GameHandler.update);
    },

    listenKeyboard: function() {
      var self = GameHandler;
      $(window).on('keydown', function(e) {
        switch(e.which) {
          case 37:
            self.thePlayer.force(180, 100);
          break;
          case 38:
            self.thePlayer.force(270, 100);
          break;
          case 39:
            self.thePlayer.force(0, 100);
          break;
          case 40:
            self.thePlayer.force(90, 100);
          break;
        }
      })
    }

  };

  return GameHandler;
});