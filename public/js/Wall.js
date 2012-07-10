define(function() {

  return Backbone.Model.extend({

    defaults: {
      background: '',

      fixtureDef: null,
      bodyDef: null,
      fixture: null,
      body: null,

      density: 1.0,
      friction: 0.5,
      restitution: 0.2,

      position: { x: 0, y: 0 },
      height: 600,
      width: 800,
      angle: 0
    },

    initialize: function(d) {


      var b2BodyDef = Box2D.Dynamics.b2BodyDef,
          b2Body = Box2D.Dynamics.b2Body,
          b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
          b2Fixture = Box2D.Dynamics.b2Fixture,
          b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
          b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

      this.fixtureDef = new b2FixtureDef;
      this.fixtureDef.density = this.get('density');
      this.fixtureDef.friction = this.get('friction');
      this.fixtureDef.restitution = this.get('restitution');

      this.fixtureDef.shape = new b2PolygonShape;
      if(this.get('orientation') == "horizontal")
        this.fixtureDef.shape.SetAsBox(this.get('width'), 0);
      if(this.get('orientation') == "vertical")
        this.fixtureDef.shape.SetAsBox(0, this.get('height'));

      this.bodyDef = new b2BodyDef;
      this.bodyDef.type = b2Body.b2_staticBody;
      this.bodyDef.position.x = this.get('position').x;
      this.bodyDef.position.y = this.get('position').y;

    },

    addToWorld: function(world) {
      this.body = world.CreateBody(this.bodyDef);
      this.fixture = this.body.CreateFixture(this.fixtureDef);
    }

  })

});