define([
  'base/GameObject'
],
function(
  GameObject
) {

  var Player = GameObject.extend({

    name: 'Anonymous',
    id: '42',
    position: { x: 10, y: 5 },
    color: { r: 0, g: 0, b: 0 },

    initialize: function(opt) {

      GameObject.prototype.initialize.call(this, opt);

      this.render();

      this.listenInput();
    },

    define: function(def) {

      def.fixture.shape = new this.b2d.CircleShape(1);
      def.fixture.density = 1.0;
      def.fixture.friction = 0.5;
      def.fixture.restitution = 0.2;

      def.body.type = this.b2d.Body.b2_dynamicBody;
      def.body.position.x = this.position.x;
      def.body.position.y = this.position.y;

      return def;

    },

    impulse: function(degrees, power) {
      this.body.ApplyImpulse(new this.b2d.Vec2(Math.cos(degrees * (Math.PI / 180)) * power,
                          Math.sin(degrees * (Math.PI / 180)) * power),
                          this.body.GetWorldCenter());
    },

    move: function(dir) {
      var self = this;
      if(dir == 'left') {
        if(!this.isMovingL) {
          this.isMovingL = true;
          self.force(180, 1000);
          this.lMovLoop = setInterval(function() {
            self.force(180, 500);
          }, 50);
        }
      }
      else if(dir == 'right') {
        if(!this.isMovingR) {
          this.isMovingR = true;
          self.force(0, 1000);
          this.rMovLoop = setInterval(function() {
            self.force(0, 500);
          }, 50);
        }
      }
      if(dir == 'top') {
        if(!this.isMovingT) {
          this.isMovingT = true;
          self.force(90, 1000);
          this.tMovLoop = setInterval(function() {
            self.force(90, 500);
          }, 50);
        }
      }
      if(dir == 'bottom') {
        if(!this.isMovingB) {
          this.isMovingB = true;
          self.force(270, 1000);
          this.bMovLoop = setInterval(function() {
            self.force(270, 500);
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
      this.body.ApplyForce(new this.b2d.Vec2(Math.cos(degrees * (Math.PI / 180)) * power,
                          Math.sin(degrees * (Math.PI / 180)) * power),
                          this.body.GetWorldCenter());
    },

    listenInput: function() {
      var self = this;
      $(window).on('keydown', function(e) {
        switch(e.which) {
          case 37:
            self.move('left');
          break;
          case 38:
            self.move('bottom');
          break;
          case 39:
            self.move('right');
          break;
          case 40:
            self.move('top');
          break;
        }
      });
      $(window).on('keyup', function(e) {
        switch(e.which) {
          case 37:
            self.stopMoving('left');
          break;
          case 38:
            self.stopMoving('bottom');
          break;
          case 39:
            self.stopMoving('right');
          break;
          case 40:
            self.stopMoving('top');
          break;
        }
      });
    }

  });

  return Player;
});