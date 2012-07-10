define(['Wall'], function(Wall) {

  return Backbone.Model.extend({

    defaults: {
      name: 'An Arena',
      walls: [],
      background: '',
    },

    initialize: function(d) {

      var b2BodyDef = Box2D.Dynamics.b2BodyDef,
          b2Body = Box2D.Dynamics.b2Body,
          b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
          b2Fixture = Box2D.Dynamics.b2Fixture,
          b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
          b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

      this.get('walls').push(new Wall({
        orientation: 'horizontal'
      }));

      this.get('walls').push(new Wall({
        orientation: 'vertical'
      }));

      this.get('walls').push(new Wall({
        orientation: 'vertical',
        position: {
          x: 80,
          y: 0
        }
      }));

      this.get('walls').push(new Wall({
        orientation: 'horizontal',
        position: {
          x: 0,
          y: 60
        }
      }));

    },

    addToWorld: function(world) {
      _.each(this.get('walls'), function(el, i) {
        el.addToWorld(world);
      });
    },

    loadFromFile: function(url) {

    }

  })

});