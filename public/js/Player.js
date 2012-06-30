define(function() {

  return Backbone.Model.extend({
    
    attributes: {
      name: 'Anonymous',
      id: '42',
      position: { x: 0, y: 0 },
      color: {r: 0, g: 0, b: 0},

      fixtureDef: null,
      bodyDef: null,
      fixture: null,
      body: null
    },

    initialize: function(d) {

      var b2BodyDef = Box2D.Dynamics.b2BodyDef,
          b2Body = Box2D.Dynamics.b2Body,
          b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
          b2Fixture = Box2D.Dynamics.b2Fixture,
          b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;

      this.fixtureDef = new b2FixtureDef;
      this.fixtureDef.density = 1.0;
      this.fixtureDef.friction = 0.5;
      this.fixtureDef.restitution = 0.2;

      this.fixtureDef.shape = new b2CircleShape(1);

      this.bodyDef = new b2BodyDef;
      this.bodyDef.type = b2Body.b2_dynamicBody;
      this.bodyDef.position.x = 10;
      this.bodyDef.position.y = 10;
    },

    addToWorld: function(world) {
      this.body = world.CreateBody(this.bodyDef);
      this.fixture = this.body.CreateFixture(this.fixtureDef);
    },

    impulse: function(degrees, power) {
      var b2Vec2 = Box2D.Common.Math.b2Vec2;
      this.body.ApplyImpulse(new b2Vec2(Math.cos(degrees * (Math.PI / 180)) * power, 
                          Math.sin(degrees * (Math.PI / 180)) * power), 
                          this.body.GetWorldCenter());
    },

    force: function(degrees, power) {
      var b2Vec2 = Box2D.Common.Math.b2Vec2;
      this.body.ApplyForce(new b2Vec2(Math.cos(degrees * (Math.PI / 180)) * power, 
                          Math.sin(degrees * (Math.PI / 180)) * power), 
                          this.body.GetWorldCenter());
    }

  });
});