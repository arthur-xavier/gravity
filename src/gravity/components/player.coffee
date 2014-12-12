# src/gravity/objects/player.coffee

require 'components/planet'

class Components.Player extends Axe.Component
  #
  @label 'player'

  #
  @include Components.Planet

  @property 'acceleration', 0.025
  @property 'torque', 0.05
  @property 'closest', 75

  #
  if !window.MOBILE
    @component Axe.Keyboard, ->
      @update = bind @parent, ->
        if @keyboard.keyDown 38
          @physics.velocity.y -= @acceleration
        else if @keyboard.keyDown 40
          @physics.velocity.y += @acceleration

        if @keyboard.keyDown 39
          @physics.velocity.x += @acceleration
          @physics.rotation += (Math.PI/8 - @physics.rotation)*@torque
        else if @keyboard.keyDown 37
          @physics.velocity.x -= @acceleration
          @physics.rotation += (Math.PI/-8 - @physics.rotation)*@torque
        else
          @physics.rotation += (0 - @physics.rotation)*@torque

  else if window.DeviceOrientationEvent
    @component Axe.Orientation, ->
      @onMotion = bind @parent, (data) ->
        if data.beta > 1
          @physics.velocity.y -= @acceleration
        else if data.beta < -1
          @physics.velocity.y += @acceleration

        if data.alpha > 1
          @physics.velocity.x += @acceleration
          @physics.rotation += (Math.PI/8 - @physics.rotation)*@torque
        else if data.alpha < -1
          @physics.velocity.x -= @acceleration
          @physics.rotation += (Math.PI/-8 - @physics.rotation)*@torque
        else
          @physics.rotation += (0 - @physics.rotation)*@torque
  else
    alert "Device orientation not supported."
    throw new Error "Device orientation not supported."

  #
  constructor: (@state) ->
    super @state
    @render.gravityField = false

  update: ->
    # score count
    @closest = 75
    @state.components
    .filter (o) -> o? and o.id != @id and o.constructor.name == "Planet"
    .forEach (o) =>
      @closest = Math.min @closest, @physics.position.distance o.physics.position, 75
      if !o.passed and o.physics.position.y > @physics.position.y
        o.passed = true
        @state.scored()

    ps = game.pixelSize
    r = @physics.radius

    as @physics, ->
      (@position.x = r; @velocity.x = 0) if @position.x < r
      (@position.y = r; @velocity.y = 0) if @position.y < r
      if @position.x > game.canvas.width / ps - r
        @position.x = game.canvas.width / ps - r
        @velocity.x = 0
      if @position.y > game.canvas.height / ps + r
        @state.collided()

    @render.color.r = Math.lerp 1.5, 0.0, @closest / 75
    @render.color.g = Math.lerp 0.0, 1.0, @closest / 75
    @render.color.b = Math.lerp 0.0, 1.0, @closest / 75

    @render.style = "rgb(#{Math.round @render.color.r*255},
    #{Math.round @render.color.g*255},
    #{Math.round @render.color.b*255})"

    # friction
    @physics.velocity._mul (new Vector 0.98)
    @physics.angularVelocity *= 0.95
