# src/gravity/components/planet.coffee

class Components.Planet extends Axe.Component
  #
  @label 'planet'

  @property 'passed', false

  #
  @component Components.Physics

  @component Axe.Renderable, ->
    @property 'style'
    @property 'gravityField', true

    @render = bind @parent, ->
      @render.context.save()

      # draw planet (square)
      @render.context.translate @physics.position.x, @physics.position.y
      @render.context.rotate @physics.rotation
      @render.context.fillStyle = @render.style
      @render.context.fillRect -@physics.radius, -@physics.radius,
        @physics.radius*2, @physics.radius*2

      # draw gravity field
      if @render.gravityField
        @render.context.beginPath()
        @render.context.setLineDash [2,3]
        @render.context.rotate -@physics.rotation*0.75
        @render.context.arc 0, 0, @physics.radius*@physics.gravityField, 0, 2*Math.PI, false
        @render.context.lineWidth = 0.5
        @render.context.strokeStyle = 'white'
        @render.context.stroke()

      @render.context.restore()

  #
  constructor: (@state) ->
    super @state
 
  update: ->
    # destroy the planet when outside the screen
    if @physics.position.y > game.canvas.height/game.pixelSize + @physics.radius*@physics.gravityField or
    @physics.position.y < -@physics.radius*@physics.gravityField or
    @physics.position.x > game.canvas.width/game.pixelSize + @physics.radius*@physics.gravityField or
    @physics.position.x < -@physics.radius*@physics.gravityField
      @destroy()

    # keep fixed y velocity
    @physics.velocity.y = @physics.y_velocity
