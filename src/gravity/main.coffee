# src/gravity/main.coffee

window.Components = new Object
require 'components/physics'
require 'components/player'
require 'components/scoreTexts'

window.States = new Object
require 'states/menu'
require 'states/game'
require 'states/score'

window.onload = ->
  #
  window.game = new Axe.Game name: 'gravity'

  game.setup ->
    @pixelSize = 5

    # on resize
    @resize = (previousSize) ->
      # resize canvas
      @canvas.width = @canvas.height = Math.min window.innerWidth, window.innerHeight
      window.SIZE = new Vector @canvas.width, @canvas.height
      # reposition canvas
      @canvas.style.position = 'absolute'
      @canvas.style.left = "#{window.innerWidth / 2 - @canvas.width / 2}px"
      # calculate resize ratio
      ratio = window.SIZE.div previousSize
      @pixelSize *= ratio.x

    # pixelate effect
    @flip = ->
      @context.drawImage @buffer,
        0, 0, @canvas.width / @pixelSize, @canvas.height / @pixelSize
        0, 0, @canvas.width, @canvas.height

  game.states.push new States.Menu

  # run
  game.start()

document.addEventListener "deviceready", window.onload, false if window.MOBILE