# src/gravity/states/game.coffee

PlanetColors = Axe.Colors.filter (c) ->
  c != 'black' and c != 'cyan' and c != 'aqua'  

class States.Game extends Axe.State
    @property 'score'
    @property 'scroll'
    @property 'scoreboard'
    @property 'interval'
    
    constructor: (@scroll) ->
      @scoreboard = document.getElementById 'scoreboard'

    enter: ->
      @score = 0
      @scoreboard.style.display = 'block'

      # spawn player
      as (new Components.Player @), ->
        @render.color = r: 0, g: 1.0, b: 1.0
        #@render.style = 'aqua'
        @render.style = 'rgb(0, 255, 255)'
        @physics.position = new Vector 0.5 / game.pixelSize, 0.75 / game.pixelSize, true
        @physics.rotation = 0
        @physics.radius = 6
        @physics.mass = 7

      #as (new Components.ScoreTexts @)
      new Components.ScoreTexts @

      # spawn planet
      spawnPlanet = =>
        as (new Components.Planet @), ->
          @render.style = PlanetColors.pick()
          @physics.radius = random(8, 15)
          @physics.mass = random(3.5, 6)
          #
          @physics.rotation = random(-Math.PI, Math.PI)
          @physics.angularVelocity = random(-Math.PI / 100, Math.PI / 100)
          #
          @physics.velocity = new Vector random(-0.05, 0.05), random(1.0, 1.25)
          @physics.y_velocity = @physics.velocity.y
          #
          @physics.position = new Vector random(0.1, 0.9) / game.pixelSize, 0, true
          @physics.position.y = -@physics.radius*@physics.gravityField

      # spawn planets
      @interval = interval 2250, spawnPlanet

    collided: ->
      game.states.unshift new States.Score @score, @scroll
      game.next()

    scored: ->
      @score++
      @dispatch 'scored'

    exit: ->
      # destroy components
      @dispatch 'destroy'
      #
      @scoreboard.style.display = 'none'
      clearInterval @interval

    update: ->
      # update components
      @dispatch 'update'
      # display score
      @scoreboard.innerHTML = @score
      # scroll background
      @scroll = (@scroll + 2)%400
      game.buffer.style.backgroundPosition = "0px #{@scroll}px"

    resize: (previousSize) ->
      @dispatch 'resize'
      @scoreboard.style.fontSize = "#{game.pixelSize * 3/5}em"
      @scoreboard.style.top = "40px"