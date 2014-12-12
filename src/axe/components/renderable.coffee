# src/gravity/components/renderable.coffee

class Axe.Renderable extends Axe.Component
  #
  @label 'render'
  #
  constructor: (@state) ->
    super @state
    
  render: ->
  update: ->
    @canvas  = Axe.Game.instance.canvas
    @context = Axe.Game.instance.context
    @render() if typeof @render == "function"
