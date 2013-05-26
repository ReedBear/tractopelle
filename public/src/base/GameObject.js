define([
  'base/GameComponent'
], function(GameComponent) {

  return GameComponent.extend({

    render: function() {

      var definition = this.define({
        fixture: new this.b2d.FixtureDef(),
        body: new this.b2d.BodyDef()
      });

      var world = this.getWorld();

      this.draw(definition, world);

      this.enhance();
    },

    define: function(definition) {
      definition.fixture.shape = new this.b2d.CircleShape(0);
      return definition;
    },

    getWorld: function() {

      if(!this.controller.world) {
        throw new Error('No World Found');
      }

      return this.controller.world;
    },

    draw: function(definition, world) {
      this.body = world.CreateBody(definition.body);
      this.fixture = this.body.CreateFixture(definition.fixture);
    },

    enhance: function() {

    }

  });
});