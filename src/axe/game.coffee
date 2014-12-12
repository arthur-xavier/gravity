# src/axe/game.coffee

class Axe.Game extends Axe.StateMachine
  #
  @instance: null

  states: []

  #
  constructor: (options, callback) ->
    options = JSON.parse options if typeof options == "string"
    @name = options.name
    @constructor.instance = this
    callback.call @ if typeof callback == "function"

  setup: (callback) ->
    @canvas = document.getElementById @name
    @context = @canvas.getContext "2d"

    @buffer = document.createElement 'canvas'
    @bufferContext = @buffer.getContext '2d'

    window.onresize = =>
      previousSize = new Vector @canvas.width, @canvas.height
      @resize previousSize
      Axe.StateMachine.prototype.resize.call @, previousSize

      @buffer.width = @canvas.width
      @buffer.height = @canvas.height

      @context.mozImageSmoothingEnabled = false;
      @context.webkit1ImageSmoothingEnabled = false;
      @context.imageSmoothingEnabled = false;

    as @, callback

  start: ->
    window.onresize()
    Axe.StateMachine.prototype.start.call @
    @loop()

  resize: ->

  flip: ->
    @context.drawImage @buffer, 0, 0
  swapCanvas: ->
    [@canvas, @context, @buffer, @bufferContext] = 
      [@buffer, @bufferContext, @canvas, @context]
  clear: ->
    @context.clearRect 0, 0, @canvas.width, @canvas.height

  loop: ->
    @clear()
    @swapCanvas()
    @clear()

    @update()

    @swapCanvas()

    @flip()

    requestAnimationFrame (bind @, @loop)
