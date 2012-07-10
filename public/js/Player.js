define(function() {

  return Backbone.Model.extend({
    
    defaults: {
      name: 'Anonymous',
      id: '42',
      position: { x: 0, y: 0 },
      color: { r: 0, g: 0, b: 0 },

      fixtureDef: null,
      bodyDef: null,
      fixture: null,
      body: null
    },

    isMovingL: false,
    lMovLoop: null,
    isMovingR: false,
    rMovLoop: null,
    isMovingT: false,
    tMovLoop: null,
    isMovingB: false,
    bMovLoop: null,

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

    move: function(dir) {
      if(dir == 'left') {
        if(!this.isMovingL) {
          var self = this;
          this.isMovingL = true;
          self.force(180, 1000);
          this.lMovLoop = setInterval(function() {
            self.force(180, 500)
          }, 50);
        }
      }
      else if(dir == 'right') {
        if(!this.isMovingR) {
          var self = this;
          this.isMovingR = true;
          self.force(0, 1000);
          this.rMovLoop = setInterval(function() {
            self.force(0, 500)
          }, 50);
        }
      }
      if(dir == 'top') {
        if(!this.isMovingT) {
          var self = this;
          this.isMovingT = true;
          self.force(90, 1000);
          this.tMovLoop = setInterval(function() {
            self.force(90, 500)
          }, 50);
        }
      }
      if(dir == 'bottom') {
        if(!this.isMovingB) {
          var self = this;
          this.isMovingB = true;
          self.force(270, 1000);
          this.bMovLoop = setInterval(function() {
            self.force(270, 500)
          }, 50);
        }
      }
    },

    stopMoving: function(dir) {
      
      if(dir == 'left') {
        clearInterval(this.lMovLoop);
        this.isMovingL = false;
      }
      
      if(dir == 'right') {
        clearInterval(this.rMovLoop);
        this.isMovingR = false;
      }
      
      if(dir == 'top') {
        clearInterval(this.tMovLoop);
        this.isMovingT = false;
      }

      if(dir == 'bottom') {
        clearInterval(this.bMovLoop);
        this.isMovingB = false;
      }
    
    },

    force: function(degrees, power) {
      var b2Vec2 = Box2D.Common.Math.b2Vec2;
      this.body.ApplyForce(new b2Vec2(Math.cos(degrees * (Math.PI / 180)) * power, 
                          Math.sin(degrees * (Math.PI / 180)) * power), 
                          this.body.GetWorldCenter());
    }

  });
});