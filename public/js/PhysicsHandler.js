define(function() {
  var PhysicsHandler = {

    world: null,
    canvas: null,
    context: null,
    scale: 30,

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

      this.canvas = canvas;
      this.context = canvas.getContext("2d");

      this.world = new b2World(
        new b2Vec2(0, 10),   //gravity
        true                 //allow sleep
      );

      var fixDef = new b2FixtureDef;
      fixDef.density = 1.0;
      fixDef.friction = 0.5;
      fixDef.restitution = 0.2;

      var bodyDef = new b2BodyDef;
      bodyDef.type = b2Body.b2_staticBody;
             
      // positions the center of the object (not upper left!)
      bodyDef.position.x = 800 / 2 / this.scale;
      bodyDef.position.y = 600 / this.scale;

      fixDef.shape = new b2PolygonShape;
       
      // half width, half height.
      fixDef.shape.SetAsBox((600 / this.scale) / 2, (10/this.scale) / 2);

      this.world.CreateBody(bodyDef).CreateFixture(fixDef);
      
      bodyDef.type = b2Body.b2_dynamicBody;
      for(var i = 0; i < 10; ++i) {
          if(Math.random() > 0.5) {
              fixDef.shape = new b2PolygonShape;
              fixDef.shape.SetAsBox(
                    Math.random() + 0.1 //half width
                 ,  Math.random() + 0.1 //half height
              );
          } else {
              fixDef.shape = new b2CircleShape(
                  Math.random() + 0.1 //radius
              );
          }
          bodyDef.position.x = Math.random() * 25;
          bodyDef.position.y = Math.random() * 10;
          this.world.CreateBody(bodyDef).CreateFixture(fixDef);
      }

      //setup debug draw
      var debugDraw = new b2DebugDraw();
      debugDraw.SetSprite(this.context);
      debugDraw.SetDrawScale(this.scale);
      debugDraw.SetFillAlpha(0.3);
      debugDraw.SetLineThickness(1.0);
      debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
      this.world.SetDebugDraw(debugDraw);

      // Start the loop
      requestAnimFrame(PhysicsHandler.update);
    },

    update: function() {
      var self = PhysicsHandler;

      self.world.Step(
        1 / 60,   //frame-rate
        10,       //velocity iterations
        10        //position iterations
      );
      self.world.DrawDebugData();
      self.world.ClearForces();

      requestAnimFrame(PhysicsHandler.update);
    }
  };

  return PhysicsHandler;
});