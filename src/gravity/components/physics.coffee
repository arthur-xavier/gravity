# src/gravity/components/physics.coffee

class Components.Physics extends Axe.Component
  #
  @label 'physics'
  #
  @property "position", new Vector
  @property "rotation", 0
  @property 'velocity'
  @property 'angularVelocity', 0
  @property 'radius', 3
  @property 'mass', 1

  @property 'gravityField', 6

  #
  constructor: (@state) ->
    super @state
    @velocity = new Vector

  update:  ->
    @state.components
    .filter (o) -> o? and o.constructor.name == "Physics"
    .forEach (o) =>
      if o.id != @.id and o != null
        r = Math.max(@radius, o.radius)
        d = o.position.distance @position
        f = if d-@radius < r*@gravityField then @mass*o.mass / (d*d) else 0

        # planets collided
        if d - @radius < r
          f = 0
          normal = o.position.sub(@position).normalize().mul -1
          theta = Math.acos (@velocity.dot(normal) / @velocity.length())
          @velocity.rotate theta
          if @parent.constructor.name == "Player" or
          o.parent.constructor.name == "Player"
            @state.collided()

        # ||@position - o.position|| * f
        @velocity._add @position.sub(o.position).normalize().mul(-f)

    #
    @position._add @velocity
    @rotation += @angularVelocity
