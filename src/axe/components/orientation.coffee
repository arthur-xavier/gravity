# src/axe/orientation/compass.coffee

class Axe.Orientation extends Axe.Component
  #
  @label 'orientation'

  #
  constructor: (@state) ->
    super @state

    window.addEventListener 'deviceorientation', @onMotion, false

  destructor: ->
    window.removeEventListener 'deviceorientation', @onMotion, false

  onMotion: (acceleration) ->
