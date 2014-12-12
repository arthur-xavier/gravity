# src/gravity/components/keyboard.coffee

class Axe.Keyboard extends Axe.Component
  #
  @label 'keyboard'
  #
  @keys: {}

  #
  constructor: (@state) ->
    super @state
    
    @__onKeyDown = bind @, (e) ->
      down = Axe.Keyboard.keys[e.keyCode]
      Axe.Keyboard.keys[e.keyCode] = true
      @onKeyDown e.keyCode if !down
      
    @__onKeyUp = bind @, (e) ->
      up = !Axe.Keyboard.keys[e.keyCode]
      Axe.Keyboard.keys[e.keyCode] = false
      @onKeyUp e.keyCode if !up

    window.addEventListener 'keydown', @__onKeyDown, false
    window.addEventListener 'keyup', @__onKeyUp, false

  destructor: ->
    window.removeEventListener 'keydown', @__onKeyDown, false
    window.removeEventListener 'keyup', @__onKeyUp, false

  onKeyDown: (key) ->
  onKeyUp: (key) ->

  keyDown: (key) ->
    Axe.Keyboard.keys[key]

  keyUp: (key) ->
    !Axe.Keyboard.keys[key]
